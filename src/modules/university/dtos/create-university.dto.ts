import { Role } from 'src/modules/auth/entities/admin.entity';
import { IsString, IsEmail, IsBoolean, IsOptional, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';

export class CreateUniversityDTO {
    @IsString()
    @MinLength(1, { message: 'University name is required' })
    @MaxLength(200, { message: 'University name must not exceed 200 characters' })
    university_name: string;

    @IsString()
    @MinLength(1, { message: 'Website domain is required' })
    @MaxLength(50, { message: 'Website domain must not exceed 50 characters' })
    website_domain: string;

    @IsString()
    @MinLength(1, { message: 'Country is required' })
    @MaxLength(50, { message: 'Country name must not exceed 50 characters' })
    country: string;

    @IsString()
    @IsOptional()
    accreditation_body?: string;

    @IsEmail({}, { message: 'Please enter a valid email address' })
    @MinLength(1, { message: 'Email is required' })
    university_email: string;

    @IsString()
    @MinLength(1, { message: 'Wallet address is required' })
    @MaxLength(50, { message: 'Wallet address must not exceed 50 characters' })
    wallet_address: string;

    @IsString()
    @MinLength(1, { message: 'Staff name is required' })
    @MaxLength(50, { message: 'Staff name must not exceed 50 characters' })
    staff_name: string;

    @IsString()
    @MinLength(1, { message: 'Job title is required' })
    @MaxLength(50, { message: 'Job title must not exceed 50 characters' })
    job_title: string;

    @IsString()
    @MinLength(1, { message: 'Phone number is required' })
    @MaxLength(15, { message: 'Phone number must not exceed 15 characters' })
    phone_number: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(50, { message: 'Password must not exceed 50 characters' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
    password: string;

    @IsBoolean()
    @IsOptional()
    is_verified?: boolean;

    @IsEnum(Role)
    @IsOptional()
    role?: Role.UNIVERSITY_ADMIN;
}
