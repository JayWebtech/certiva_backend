// src/modules/verification-logs/data_transfer_objects/create-verification-log.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for creating verification logs
 * @field website_domain - Domain to verify (required)
 * @field status - Verification status (required)
 * @field certificate_id - Optional certificate reference
 */
export class CreateVerificationLogDto {
  @ApiProperty({
    description: 'Domain to verify',
    example: 'example.edu',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  website_domain: string;

  @ApiProperty({
    description: 'Verification status',
    example: 'VERIFIED',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Certificate reference ID',
    example: 'cert_123456',
    required: false
  })
  @IsString()
  @IsOptional()
  certificate_id?: string;
}