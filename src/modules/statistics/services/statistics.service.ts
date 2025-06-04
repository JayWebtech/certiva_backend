import { Injectable } from '@nestjs/common';
import { StatisticsResponseDto } from 'src/modules/statistics/dto/statistics-response.dto';
import { StatisticsRepository } from 'src/modules/statistics/repositories/statistics.repository';
import { DatabaseException } from 'src/modules/shared/exceptions/database.exception';
import { LoggerService } from 'src/modules/shared/logger/logger.service';

@Injectable()
export class StatisticsService {
  private readonly context = 'StatisticsService'; // Context for logging

  constructor(
    private readonly repository: StatisticsRepository, // Inject repository
    private readonly logger: LoggerService, // Inject logger
  ) {}

  async getAggregatedStatistics(): Promise<StatisticsResponseDto> {
    try {
      this.logger.log('Fetching aggregated statistics', this.context); // Log operation start

      // Execute all queries in parallel for performance
      const [totalUniversities, verifiedCertificates, failedVerifications, revokedCertificates] = await Promise.all([
        this.repository.getTotalUniversities(),
        this.repository.getVerifiedCertificatesCount(),
        this.repository.getFailedVerificationsCount(),
        this.repository.getRevokedCertificatesCount(),
      ]);

      // Format and return the response
      return {
        totalUniversities,
        verifiedCertificates,
        failedVerifications,
        revokedCertificates,
        lastUpdated: new Date().toISOString(), // Add timestamp
      };

    } catch (error) {
      this.logger.error(`Statistics fetch failed: ${error.message}`, error.stack, this.context); // Detailed error log

      // Handle known database errors
      if (error instanceof DatabaseException) {
        throw error; // Re-throw with original context
      }

      // Wrap unexpected errors
      throw new DatabaseException('Statistics retrieval failed', error, this.context);
    }
  }
}