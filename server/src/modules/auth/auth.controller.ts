import { Controller, Post, Body, UnauthorizedException, HttpCode, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ShortAuthDto } from './dto/auth.dto';
import { UserWithRole } from '../users/users.types';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuthGuard, RefreshGuard } from './security-road/auth.guard';
import { CookieInterceptor } from './interceptor/cookie.interceptor';
import { LogoutInterceptor } from './interceptor/logout.interceptor';
import { ConfigService } from '@nestjs/config';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
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
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@CurrentUser() user: UserWithRole): Promise<ShortAuthDto> {
    return await this.authService.refreshToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(200)
  async me(@CurrentUser() user: UserWithRole): Promise<UserWithRole> {
    return user;
  }
}
