import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  PasswordLoginDto,
  OtpRequestDto,
  OtpVerifyDto,
  WalletLoginDto,
} from './dto/auth.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SignupAdminDto } from './dto/admin-signup.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginAdminDto } from './dto/admin-login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/password')
  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async loginWithPassword(@Body() passwordLoginDto: PasswordLoginDto) {
    return this.authService.validatePassword(
      passwordLoginDto.email,
      passwordLoginDto.password,
    );
  }

  @Post('login/otp/send')
  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Send OTP to email' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async sendOtp(@Body() otpRequestDto: OtpRequestDto) {
    return this.authService.generateOtp(otpRequestDto.email);
  }

  @Post('login/otp/verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyOtp(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.verifyOtp(otpVerifyDto.email, otpVerifyDto.otp);
  }

  @Post('login/otp/resend')
  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiResponse({ status: 200, description: 'OTP resent successfully' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async resendOtp(@Body() otpRequestDto: OtpRequestDto) {
    return this.authService.generateOtp(otpRequestDto.email);
  }

  @Post('login/wallet')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with wallet address' })
  @ApiResponse({ status: 200, description: 'Successfully logged in with wallet' })
  @ApiResponse({ status: 401, description: 'Invalid wallet address' })
  async loginWithWallet(@Body() walletLoginDto: WalletLoginDto) {
    return this.authService.validateWalletAddress(
      walletLoginDto.email,
      walletLoginDto.walletAddress,
    );
  }

  @Post("admin/signup")
  @ApiOperation({ summary: 'Sign up admin user' })
  @ApiResponse({ status: 201, description: 'Admin user created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async signupAdmin(@Body() signupAdminDto: SignupAdminDto){
      return this.authService.signupAdmin(signupAdminDto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, description: 'Successfully logged in as admin' })
  @ApiResponse({ status: 401, description: 'Invalid admin credentials' })
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto){
      return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('admin/verify-otp')
  @ApiOperation({ summary: 'Verify admin OTP' })
  @ApiResponse({ status: 200, description: 'Admin OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyAdminOtp(@Body() verifyOtpDto: VerifyOtpDto){
      return this.authService.verifyAdminOtp(verifyOtpDto);
  }
}
