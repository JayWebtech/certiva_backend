import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SecretKeyData {
  @ApiProperty({
    description: 'Email address to send the secret key to',
    example: 'admin@example.edu'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Secret key to be sent',
    example: 'sk_live_123456789abcdef'
  })
  @IsString()
  secretKey: string;
}

export class SendSecretKeysDTO {
  @ApiProperty({
    description: 'Array of email and secret key pairs',
    type: [SecretKeyData],
    example: [{
      email: 'admin@example.edu',
      secretKey: 'sk_live_123456789abcdef'
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SecretKeyData)
  data: SecretKeyData[];
} 