import { Injectable } from "@nestjs/common";
import { NestInterceptor, ExecutionContext } from "@nestjs/common";
import { CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { FullAuthDto, ShortAuthDto } from "./dto/auth.dto";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { parseDuration } from "src/utils/parse-duration";

@Injectable()
export class CookieInterceptor implements NestInterceptor {

  constructor(private readonly configService: ConfigService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp(); //from nest to express in order to manipulate cookies
    const res = ctx.getResponse<Response>(); //get res from express

    return next.handle()//execute original request
      .pipe(map((data: FullAuthDto) => { //intercept response
        if (!data?.accessToken || !data?.refreshToken) {
          return data;
        }

        const accessMaxAge = parseDuration(this.configService.get('JWT_EXPIRES_IN')!);
        const refreshMaxAge = parseDuration(this.configService.get('JWT_REFRESH_EXPIRES_IN')!);

        res.cookie('accessToken', data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: accessMaxAge,
          path: '/',
        });

        res.cookie('refreshToken', data.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: refreshMaxAge,
          path: '/',
        });

        const { accessToken, refreshToken, ...rest } = data;
        return rest as ShortAuthDto;
      })
      );
  }
}
