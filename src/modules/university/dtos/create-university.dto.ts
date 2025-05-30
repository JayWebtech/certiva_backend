import { Role } from '../../../modules/auth/entities/role.enum';
import { IsString, IsEmail, IsBoolean, IsOptional, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUniversityDTO {
    @ApiProperty({
        description: 'Name of the university',
        example: 'University of Example',
        minLength: 1,
        maxLength: 200
    })
    @IsString()
    @MinLength(1, { message: 'University name is required' })
    @MaxLength(200, { message: 'University name must not exceed 200 characters' })
    university_name: string;

    @ApiProperty({
        description: 'Website domain of the university',
        example: 'example.edu',
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @MinLength(1, { message: 'Website domain is required' })
    @MaxLength(50, { message: 'Website domain must not exceed 50 characters' })
    website_domain: string;

    @ApiProperty({
        description: 'Country where the university is located',
        example: 'United States',
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @MinLength(1, { message: 'Country is required' })
    @MaxLength(50, { message: 'Country name must not exceed 50 characters' })
    country: string;

    @ApiProperty({
        description: 'Accreditation body of the university',
        example: 'Higher Education Commission',
        required: false
    })
    @IsString()
    @IsOptional()
    accreditation_body?: string;

    @ApiProperty({
        description: 'University email address',
        example: 'contact@example.edu'
    })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    @MinLength(1, { message: 'Email is required' })
    university_email: string;

    @ApiProperty({
        description: 'University wallet address',
        example: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @MinLength(1, { message: 'Wallet address is required' })
    @MaxLength(50, { message: 'Wallet address must not exceed 50 characters' })
    wallet_address: string;

    @ApiProperty({
        description: 'Name of the staff member',
        example: 'John Doe',
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @MinLength(1, { message: 'Staff name is required' })
    @MaxLength(50, { message: 'Staff name must not exceed 50 characters' })
    staff_name: string;

    @ApiProperty({
        description: 'Job title of the staff member',
        example: 'Registrar',
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @MinLength(1, { message: 'Job title is required' })
    @MaxLength(50, { message: 'Job title must not exceed 50 characters' })
    job_title: string;

    @ApiProperty({
        description: 'Phone number of the staff member',
        example: '+1234567890',
        minLength: 1,
        maxLength: 15
    })
    @IsString()
    @MinLength(1, { message: 'Phone number is required' })
    @MaxLength(15, { message: 'Phone number must not exceed 15 characters' })
    phone_number: string;

    @ApiProperty({
        description: 'Password for university account (must contain uppercase, lowercase, number, and special character)',
        example: 'StrongP@ss123',
        minLength: 8,
        maxLength: 50
    })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(50, { message: 'Password must not exceed 50 characters' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
    password: string;

    @ApiProperty({
        description: 'Whether the university is verified',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    is_verified?: boolean;

    @ApiProperty({
        description: 'Role of the university admin',
        enum: Role,
        example: Role.UNIVERSITY_ADMIN,
        required: false
    })
    @IsEnum(Role)
    @IsOptional()
    role?: Role.UNIVERSITY_ADMIN;
}
