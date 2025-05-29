import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordLoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (6-30 characters)',
    example: 'password123',
    minLength: 6,
    maxLength: 30,
  })
  @IsString()
  @Length(6, 30)
  password: string;
}

export class OtpRequestDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

export class OtpVerifyDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '6-digit OTP code',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsNumberString()
  @Length(6, 6)
  otp: string;
}

export class WalletLoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Ethereum wallet address (42 characters, starting with 0x)',
    example: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    minLength: 42,
    maxLength: 42,
  })
  @IsString()
  @Length(42, 42)
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  walletAddress: string;
}
