import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UniversityModule } from './modules/university/university.module';
import { SupportModule } from './modules/support/support.module';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { VerificationLogsModule } from './modules/verification-logs/verification-logs.module';
import { CustomMailerModule } from './mailer/mailer.module';
import { MailModule } from './modules/mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseModule, // Existing database config
    UsersModule,    // Existing modules
    AuthModule,
    UniversityModule,
    VerificationLogsModule, // New module
    SupportModule,
    CustomMailerModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}