import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatisticsRepository } from './statistics.repository';
import { University } from '../../university/entities/university.entity';
import { VerificationLog } from '../../../entities/verification-log.entity';
import { DatabaseException } from '../../shared/exceptions/database.exception';

describe('StatisticsRepository', () => {
  let repository: StatisticsRepository;
  let mockUniversityRepo: jest.Mocked<Repository<University>>;
  let mockCertificateRepo: jest.Mocked<Repository<VerificationLog>>;
  let mockVerificationRepo: jest.Mocked<Repository<VerificationLog>>;

  beforeEach(async () => {
    // Create separate mock repositories
    mockUniversityRepo = {
      count: jest.fn(),
    } as any;

    mockCertificateRepo = {
      count: jest.fn(),
    } as any;

    mockVerificationRepo = {
      count: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsRepository,
        {
          provide: getRepositoryToken(University),
          useValue: mockUniversityRepo,
        },
        // Provide two separate instances for VerificationLog
        {
          provide: getRepositoryToken(VerificationLog),
          useFactory: () => mockCertificateRepo, // First instance
        },
        {
          provide: `${getRepositoryToken(VerificationLog)}_VERIFICATION`,
          useValue: mockVerificationRepo, // Second instance
        },
      ],
    }).compile();

    repository = module.get<StatisticsRepository>(StatisticsRepository);
  });

  describe('getTotalUniversities', () => {
    it('should return total universities count', async () => {
      const expectedCount = 10;
      mockUniversityRepo.count.mockResolvedValue(expectedCount);

      const result = await repository.getTotalUniversities();

      expect(result).toBe(expectedCount);
      expect(mockUniversityRepo.count).toHaveBeenCalledWith();
    });

    it('should throw DatabaseException on failure', async () => {
      const error = new Error('Database error');
      mockUniversityRepo.count.mockRejectedValue(error);

      await expect(repository.getTotalUniversities()).rejects.toThrow(DatabaseException);
    });
  });

  describe('getVerifiedCertificatesCount', () => {
    it('should return count with status filter', async () => {
      const expectedCount = 150;
      mockCertificateRepo.count.mockResolvedValue(expectedCount);

      const result = await repository.getVerifiedCertificatesCount();

      expect(result).toBe(expectedCount);
      expect(mockCertificateRepo.count).toHaveBeenCalledWith({
        where: { status: 'verified' }
      });
    });

    it('should throw DatabaseException on failure', async () => {
      const error = new Error('Database error');
      mockCertificateRepo.count.mockRejectedValue(error);

      await expect(repository.getVerifiedCertificatesCount()).rejects.toThrow(DatabaseException);
    });
  });

  describe('getRevokedCertificatesCount', () => {
    it('should return count with revoked status filter', async () => {
      const expectedCount = 2;
      mockCertificateRepo.count.mockResolvedValue(expectedCount);

      const result = await repository.getRevokedCertificatesCount();

      expect(result).toBe(expectedCount);
      expect(mockCertificateRepo.count).toHaveBeenCalledWith({
        where: { status: 'revoked' }
      });
    });

    it('should throw DatabaseException on failure', async () => {
      const error = new Error('Database error');
      mockCertificateRepo.count.mockRejectedValue(error);

      await expect(repository.getRevokedCertificatesCount()).rejects.toThrow(DatabaseException);
    });
  });
});