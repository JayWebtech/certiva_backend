import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { VerificationLog } from '../entities/verification-log.entity';
import { University } from '../modules/university/entities/university.entity';
import { Admin } from '../modules/auth/entities/admin.entity';
import { OTP } from '../modules/auth/entities/otp.entity';
import { Verify } from '../modules/verify/entities/verify.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dataSourceOptions = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [VerificationLog, University, Admin, OTP, Verify],
          synchronize: false,
        };
       
        return dataSourceOptions;
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Database options are not defined');
        }
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}