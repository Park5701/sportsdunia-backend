import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    return this.authService.login(loginData.username, loginData.password);
  }

  @Post('signup')
  async signup(@Body() userData: { username: string; password: string }) {
    if (!userData.username || !userData.password) {
      throw new Error('Username and password are required');
    }
    return this.authService.signup(userData.username, userData.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
