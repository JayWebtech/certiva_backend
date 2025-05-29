import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportRequestDTO } from './dtos/create-support-request.dto';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe';
import { supportRequestSchema } from './schema/support-request.schema';
import { SupportRequest } from './entities/support-request.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

class CreateSupportRequestResponse {
  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'Support request data', type: SupportRequest })
  data: SupportRequest;
}

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('request')
  @UsePipes(new ZodValidationPipe(supportRequestSchema))
  @ApiOperation({ summary: 'Create a new support request' })
  @ApiResponse({ 
    status: 201, 
    description: 'Support request created successfully',
    type: CreateSupportRequestResponse
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createSupportRequest(@Body() supportRequestData: CreateSupportRequestDTO): Promise<CreateSupportRequestResponse> {
    const supportRequest = await this.supportService.createSupportRequest(supportRequestData);
    return {
      message: 'Support request submitted successfully',
      data: supportRequest,
    };
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get all support requests' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all support requests',
    type: [SupportRequest]
  })
  async getAllSupportRequests(): Promise<SupportRequest[]> {
    return this.supportService.getAllSupportRequests();
  }
}