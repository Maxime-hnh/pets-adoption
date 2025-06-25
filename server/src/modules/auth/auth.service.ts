import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UserWithRole } from '../users/users.types';
import { FullAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) { }


  private async generateTokensForUser(user: UserWithRole): Promise<FullAuthDto> {
    const payload = { id: user.id, email: user.email, role: user.role.name };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role.name,
      accessToken,
      refreshToken
    };
  }

  async login(user: UserWithRole): Promise<FullAuthDto> {
    return this.generateTokensForUser(user);
  }

  async refreshToken(user: UserWithRole): Promise<FullAuthDto> {
    return this.generateTokensForUser(user);
  }
}
