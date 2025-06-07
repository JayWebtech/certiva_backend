import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';
import { StatisticsResponseDto } from '../dto/statistics-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Statistics') // Swagger API tag
@Controller('statistics') // Base route
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('aggregated') // GET /statistics/aggregated
  @ApiOperation({ summary: 'Get aggregated system statistics' }) // Swagger docs
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    type: StatisticsResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async getAggregatedStatistics(): Promise<StatisticsResponseDto> {
    const result = await this.statisticsService.getAggregatedStatistics(); // Delegate to service
    
    // Validate response structure
    this.validateStatisticsResponse(result);
    
    return result;
  }

  private validateStatisticsResponse(data: any): void {
    const errors: string[] = [];

    // Validate numeric fields
    const numericFields = ['totalUniversities', 'verifiedCertificates', 'failedVerifications', 'revokedCertificates'];
    numericFields.forEach(field => {
      if (typeof data[field] !== 'number' || isNaN(data[field])) {
        errors.push(`${field} must be a valid number`);
      }
    });

    // Validate date field
    if (!data.lastUpdated || isNaN(Date.parse(data.lastUpdated))) {
      errors.push('lastUpdated must be a valid ISO date string');
    }

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Invalid response data structure',
          errors,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}