import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiBody({ schema: { example: { username: 'admin', password: 'password' } } })
  async login(@Request() req) {
    return this.authService.login(req.user.username, req.user.password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiBody({ schema: { example: { username: 'admin', password: 'password' } } })
  async signup(@Body() userData: { username: string; password: string }) {
    return this.authService.signup(userData.username, userData.password);
  }
}