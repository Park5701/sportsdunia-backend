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

    // Return user data excluding password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(user: any) {  // ✅ Accept full user object instead of username & password
    const payload = { username: user.username, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user, // ✅ Return user details without password
    };
  }

  async signup(userData: { username: string; password: string }) {
    const existingUser = await this.usersService.findByUsername(userData.username);
    
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return this.usersService.createUser(userData.username, hashedPassword);
  }
}
