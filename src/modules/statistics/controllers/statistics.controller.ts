import { Controller, Get } from '@nestjs/common';
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
    return this.statisticsService.getAggregatedStatistics(); // Delegate to service
  }
}