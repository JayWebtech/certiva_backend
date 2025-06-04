import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { SupportRequest } from './entities/support-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportRequest])],
  providers: [SupportService],
  controllers: [SupportController]
})
export class SupportModule {}

