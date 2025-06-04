import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from '../services/statistics.service';
import { StatisticsResponseDto } from '../dto/statistics-response.dto';
import { DatabaseException } from '../../../modules/shared/exceptions/database.exception';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let mockStatisticsService: jest.Mocked<StatisticsService>;

  beforeEach(async () => {
    mockStatisticsService = {
      getAggregatedStatistics: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: StatisticsService,
          useValue: mockStatisticsService,
        },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  describe('GET /statistics/aggregated', () => {
    it('should return aggregated statistics successfully', async () => {
      const mockData: StatisticsResponseDto = {
        totalUniversities: 10,
        verifiedCertificates: 150,
        failedVerifications: 5,
        revokedCertificates: 2,
        lastUpdated: new Date().toISOString(),
      };

      mockStatisticsService.getAggregatedStatistics.mockResolvedValue(mockData);

      const result = await controller.getAggregatedStatistics();

      expect(result).toEqual(mockData);
      expect(mockStatisticsService.getAggregatedStatistics).toHaveBeenCalled();
    });

    it('should throw 500 error when service fails', async () => {
      mockStatisticsService.getAggregatedStatistics.mockRejectedValue(
        new DatabaseException('Database connection failed'),
      );

      await expect(controller.getAggregatedStatistics()).rejects.toThrow(
        DatabaseException,
      );
    });

    it('should return data as provided by service', async () => {
      const mockData = {
        totalUniversities: 10,
        verifiedCertificates: 150,
        failedVerifications: 5,
        revokedCertificates: 2,
        lastUpdated: new Date().toISOString(),
      };

      mockStatisticsService.getAggregatedStatistics.mockResolvedValue(mockData);

      const result = await controller.getAggregatedStatistics();

      expect(result).toEqual(mockData);
    });
  });
});