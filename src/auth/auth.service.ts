import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(user: { username: string; password: string }) {
    const validatedUser = await this.validateUser(user.username, user.password);
    const payload = { username: validatedUser.username, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userData: { username: string; password: string }) {
    const existingUser = await this.usersService.findByUsername(userData.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.usersService.createUser(userData.username, hashedPassword);
  }
}
