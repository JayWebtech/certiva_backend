import { BadRequestException, Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUniversityDTO } from './dtos/create-university.dto';
import { ZodValidationPipe } from '../../utils/ZodValidationPipe';
import { registerUniversitySchema } from './schema/register-university.schema';
import { UniversityService } from './university.service';
import { SendSecretKeysDTO } from './dtos/send-secret-keys.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';

class RegisterUniversityResponse {
  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'University registration data' })
  data: Omit<CreateUniversityDTO, 'password'> & { id: number };
}

class SecretKeyResult {
  @ApiProperty({ description: 'Email address the secret key was sent to' })
  email: string;

  @ApiProperty({ description: 'Whether the secret key was sent successfully' })
  success: boolean;
}

class SendSecretKeysResponse {
  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ 
    description: 'Results of secret key sending attempts',
    type: [SecretKeyResult]
  })
  results: SecretKeyResult[];
}

@ApiTags('University')
@Controller('university')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post('register-university')
    @UsePipes(new ZodValidationPipe(registerUniversitySchema))
    @ApiOperation({ summary: 'Register a new university' })
    @ApiResponse({ 
        status: 201, 
        description: 'University registered successfully',
        type: RegisterUniversityResponse
    })
    @ApiResponse({ status: 400, description: 'Registration failed' })
    async registerUniversity(@Body() signup: CreateUniversityDTO): Promise<RegisterUniversityResponse> {
        try {
            const university = await this.universityService.registerUniversity(signup);
            return {
                message: 'University registered successfully',
                data: university,
            };
        } catch (error) {
            throw new BadRequestException('Registration failed: ' + error.message);
        }
    }

    @Post('send-secret-keys')
    @ApiOperation({ summary: 'Send secret keys to university emails' })
    @ApiResponse({ 
        status: 200, 
        description: 'Secret keys sent successfully',
        type: SendSecretKeysResponse
    })
    @ApiResponse({ status: 400, description: 'Failed to send secret keys' })
    async sendSecretKeys(@Body() data: SendSecretKeysDTO): Promise<SendSecretKeysResponse> {
        try {
            return await this.universityService.sendSecretKeys(data);
        } catch (error) {
            throw new BadRequestException('Failed to send secret keys: ' + error.message);
        }
    }
}