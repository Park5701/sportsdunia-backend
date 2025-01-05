import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin' }) // ✅ Example in Swagger
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SignupDto {
  @ApiProperty({ example: 'newuser' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'securepassword' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
