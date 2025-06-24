import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        res.cookie('accessToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 0,
          path: '/',
        });

        res.cookie('refreshToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 0,
          path: '/',
        });
      })
    );
  }
}
