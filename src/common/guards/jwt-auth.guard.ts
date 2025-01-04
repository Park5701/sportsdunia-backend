import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
      super();
    }
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('No token provided');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        request.user = this.jwtService.verify(token);
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  