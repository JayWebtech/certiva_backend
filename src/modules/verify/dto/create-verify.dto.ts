import { IsUUID } from 'class-validator';

export class CreateVerifyDto {
    @IsUUID()
    certificate_id: string;
}
