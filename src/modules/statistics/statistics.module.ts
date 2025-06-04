// src/modules/statistics/statistics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from 'src/modules/statistics/services/statistics.service';
import { StatisticsRepository } from 'src/modules/statistics/repositories/statistics.repository';
import { University } from '../university/entities/university.entity';
import { VerificationLog } from '../../entities/verification-log.entity';
import { LoggerService } from '../shared/logger/logger.service';

@Module({
  imports: [
    // Register the entities so repositories can be injected
    TypeOrmModule.forFeature([
      University,
      VerificationLog,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    StatisticsRepository,
    LoggerService, // Add LoggerService as a provider
  ],
  exports: [
    StatisticsService, // Export if other modules need to use it
  ],
})
export class StatisticsModule {}