import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from '../../university/entities/university.entity';
import { VerificationLog } from '../../../entities/verification-log.entity';
import { DatabaseException } from '../../shared/exceptions/database.exception';

@Injectable()
export class StatisticsRepository {
  constructor(
    @InjectRepository(University)
    private readonly universityRepo: Repository<University>,
    @InjectRepository(VerificationLog)
    private readonly certificateRepo: Repository<VerificationLog>,
    @InjectRepository(VerificationLog)
    private readonly verificationRepo: Repository<VerificationLog>,
  ) {}

  async getTotalUniversities(): Promise<number> {
    try {
      return await this.universityRepo.count(); // Simple count query
    } catch (error) {
      throw new DatabaseException('Failed to count universities');
    }
  }

  async getVerifiedCertificatesCount(): Promise<number> {
    try {
      return await this.certificateRepo.count({
        where: { status: 'verified' } // Filter by status
      });
    } catch (error) {
      throw new DatabaseException('Failed to count verified certificates');
    }
  }

  async getFailedVerificationsCount(): Promise<number> {
    try {
      return await this.verificationRepo.count({
        where: { status: 'failed' } // Filter by failed status
      });
    } catch (error) {
      throw new DatabaseException('Failed to count failed verifications');
    }
  }

  async getRevokedCertificatesCount(): Promise<number> {
    try {
      return await this.certificateRepo.count({
        where: { status: 'revoked' } // Filter by revoked status
      });
    } catch (error) {
      throw new DatabaseException('Failed to count revoked certificates');
    }
  }
}