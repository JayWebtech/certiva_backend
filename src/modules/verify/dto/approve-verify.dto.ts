import { IsUUID, IsString } from 'class-validator';

export class ApproveVerifyDto {
  @IsUUID()
  verification_id: string;

  @IsString()
  approval_key: string;
}
