import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, IsPositive } from 'class-validator';

export class StatisticsResponseDto {
  @ApiProperty({
    description: 'Total number of registered universities',
    example: 42,
  })
  @IsInt()
  @IsPositive()
  totalUniversities: number;

  @ApiProperty({
    description: 'Total number of successfully verified certificates',
    example: 1250,
  })
  @IsInt()
  @IsPositive()
  verifiedCertificates: number;

  @ApiProperty({
    description: 'Total number of failed certificate verifications',
    example: 18,
  })
  @IsInt()
  @IsPositive()
  failedVerifications: number;

  @ApiProperty({
    description: 'Total number of revoked certificates',
    example: 7,
  })
  @IsInt()
  @IsPositive()
  revokedCertificates: number;

  @ApiProperty({
    description: 'Timestamp of when statistics were last updated',
    example: '2023-07-20T14:30:00.000Z',
  })
  @IsISO8601()
  lastUpdated: string;
}