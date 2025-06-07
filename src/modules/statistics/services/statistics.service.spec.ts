import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { StatisticsRepository } from '../repositories/statistics.repository';
import { LoggerService } from '../../../modules/shared/logger/logger.service';
import { DatabaseException } from '../../../modules/shared/exceptions/database.exception';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let mockRepository: jest.Mocked<StatisticsRepository>;
  let mockLogger: jest.Mocked<LoggerService>;

  beforeEach(async () => {
    mockRepository = {
      getTotalUniversities: jest.fn(),
      getVerifiedCertificatesCount: jest.fn(),
      getFailedVerificationsCount: jest.fn(),
      getRevokedCertificatesCount: jest.fn(),
    } as any;

    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: StatisticsRepository,
          useValue: mockRepository,
        },
        {
          provide: LoggerService,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  describe('getAggregatedStatistics', () => {
    it('should aggregate statistics from all sources', async () => {
      // Setup mock repository responses
      mockRepository.getTotalUniversities.mockResolvedValue(10);
      mockRepository.getVerifiedCertificatesCount.mockResolvedValue(150);
      mockRepository.getFailedVerificationsCount.mockResolvedValue(5);
      mockRepository.getRevokedCertificatesCount.mockResolvedValue(2);

      const result = await service.getAggregatedStatistics();

      expect(result).toEqual({
        totalUniversities: 10,
        verifiedCertificates: 150,
        failedVerifications: 5,
        revokedCertificates: 2,
        lastUpdated: expect.any(String),
      });

      // Verify all repository methods were called
      expect(mockRepository.getTotalUniversities).toHaveBeenCalled();
      expect(mockRepository.getVerifiedCertificatesCount).toHaveBeenCalled();
      expect(mockRepository.getFailedVerificationsCount).toHaveBeenCalled();
      expect(mockRepository.getRevokedCertificatesCount).toHaveBeenCalled();
    });

    it('should handle partial failures gracefully', async () => {
      mockRepository.getTotalUniversities.mockResolvedValue(10);
      mockRepository.getVerifiedCertificatesCount.mockRejectedValue(
        new Error('DB timeout'),
      );
      mockRepository.getFailedVerificationsCount.mockResolvedValue(5);
      mockRepository.getRevokedCertificatesCount.mockResolvedValue(2);

      await expect(service.getAggregatedStatistics()).rejects.toThrow(
        DatabaseException,
      );
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should log errors properly', async () => {
      const testError = new Error('Test error');
      mockRepository.getTotalUniversities.mockRejectedValue(testError);

      await expect(service.getAggregatedStatistics()).rejects.toThrow();
      
      // Fix the assertion based on the actual error output
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Statistics fetch failed'),
        testError.stack,
        'StatisticsService'
      );
    });
  });
});