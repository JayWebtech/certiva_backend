import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSupportRequestDTO {
  @ApiProperty({
    description: 'Name of the person making the support request',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Company or organization name',
    example: 'Example University'
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'Email address for contact',
    example: 'john.doe@example.edu'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Support request message or description',
    example: 'I need help with certificate verification process'
  })
  @IsString()
  @IsNotEmpty()
  request: string;
}
