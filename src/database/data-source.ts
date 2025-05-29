import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { University } from '../modules/university/entities/university.entity';
import { SupportRequest } from '../modules/support/entities/support-request.entity';
import { User } from '../modules/users/entities/user.entity';
import { VerificationLog } from '../modules/verification-logs/entities/verification-log.entity';
import { Admin } from '../modules/auth/entities/admin.entity';
import { OTP } from '../modules/auth/entities/otp.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [University, SupportRequest, User, VerificationLog, Admin, OTP],
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;