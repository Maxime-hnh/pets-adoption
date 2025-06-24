import { Controller, Post, Body, UnauthorizedException, HttpCode, Get, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ShortAuthDto } from './dto/auth.dto';
import { UserWithRole } from '../users/users.types';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { CookieInterceptor } from './cookie.interceptor';
import { LogoutInterceptor } from './logout.interceptor';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDto): Promise<ShortAuthDto> {
    const user = await this.usersService.findByEmail(body.email);
    const isValid = await this.usersService.validPassword(body.password, user);
    if (!isValid) throw new UnauthorizedException('Identifiants incorrects');

    return this.authService.login(user);
  }

  @UseInterceptors(LogoutInterceptor)
  @Post('logout')
  @HttpCode(200)
  logout(): { message: string } {
    return { message: 'Déconnexion réussie' };
  }

  @UseInterceptors(CookieInterceptor)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request): Promise<ShortAuthDto> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('Refresh token is missing');

    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(200)
  async me(@CurrentUser() user: UserWithRole): Promise<UserWithRole> {
    return user;
  }
}
