import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PayloadDto } from '../dto/auth.dto';
import { UsersService } from '../../users/users.service';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: PayloadDto) {
    const refreshToken = req.cookies['refreshToken'];
    const user = await this.usersService.findById(payload.id);
    if (!user) throw new UnauthorizedException('User not found');

    if (!user.refreshToken
      || !timingSafeEqual(Buffer.from(user.refreshToken), Buffer.from(refreshToken)) // ✅ SÉCURISÉ contre les attaques timing
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
