// src/modules/verification-logs/controllers/verification-logs.controller.ts
import { 
    Controller, 
    Post, 
    Get, 
    Body, 
    HttpException, 
    HttpStatus,
    UsePipes,
    ValidationPipe
  } from '@nestjs/common';
import { VerificationLogsService } from '../services/verification-logs.service';
import { CreateVerificationLogDto } from '../dtos/create-verification-log.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
/**
 * Handles HTTP requests for verification logs
 * @route /verification-logs
 */
@ApiTags('Verification Logs')
@Controller('verification-logs')
@UsePipes(new ValidationPipe({ transform: true })) // Auto-validate all requests
export class VerificationLogsController {
  constructor(private readonly service: VerificationLogsService) {}

  /**
   * Creates a new verification log
   * @param dto - Validated request data
   * @returns Created log record
   * @throws HTTP 400 if validation fails
   * @throws HTTP 500 if database error occurs
   */
  @Post()
  @ApiOperation({ summary: 'Create a new verification log' })
  @ApiResponse({ 
    status: 201, 
    description: 'Verification log created successfully',
    type: CreateVerificationLogDto
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() dto: CreateVerificationLogDto) {
    try {
      return await this.service.create(dto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create log',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Retrieves all verification logs
   * @returns Array of existing logs
   */
  @Get()
  @ApiOperation({ summary: 'Get all verification logs' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all verification logs',
    type: [CreateVerificationLogDto]
  })
  async findAll() {
    return this.service.findAll();
  }
}