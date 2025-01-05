import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); // ✅ Pass req.user directly
  }

  @Post('signup')
  async signup(@Body() userData: { username: string; password: string }) {
    return this.authService.signup(userData); // ✅ Pass userData object
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
