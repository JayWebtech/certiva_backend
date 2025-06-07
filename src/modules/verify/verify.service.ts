import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Verify } from './entities/verify.entity';
import { VerifyGateway } from './verify.gateway';

@Injectable()
export class VerifyService {
  constructor(
    @InjectRepository(Verify)
    private verifyRepo: Repository<Verify>,
    private verifyGateway: VerifyGateway,
  ) {}

  async initiateVerification(certificate_id: string) {
    const verification = this.verifyRepo.create({ certificate_id });
    await this.verifyRepo.save(verification);

    return {
      verification_id: verification.verification_id,
      graduate_link: `https://localhost:3000/verify/${verification.verification_id}`,
    };
  }

  async approveVerification(verification_id: string, approval_key: string) {
    const verification = await this.verifyRepo.findOneBy({ verification_id });
    if (!verification || verification.status !== 'pending')
      throw new Error('Invalid verification');

    verification.status = 'approved';
    verification.approval_key = approval_key;
    await this.verifyRepo.save(verification);

    // 🔔 Notify Employer via WebSocket
    this.verifyGateway.notifyEmployer(verification_id, {
      status: 'approved',
      approval_key,
    }); 

    return verification;
  }
}
