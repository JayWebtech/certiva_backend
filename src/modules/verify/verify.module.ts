import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { VerifyGateway } from './verify.gateway';
import { Verify } from './entities/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verify])],
  controllers: [VerifyController],
  providers: [VerifyService, VerifyGateway],
})
export class VerifyModule {}
