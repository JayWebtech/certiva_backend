import { Controller, Post, Body } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyGateway } from './verify.gateway';
import { CreateVerifyDto } from './dto/create-verify.dto';
import { ApproveVerifyDto } from './dto/approve-verify.dto';
@Controller('verify')
export class VerifyController {
  constructor(
    private readonly verifyService: VerifyService,
    // private readonly verifyGateway: VerifyGateway,
  ) {}

  @Post('initiate')
  async initiate(@Body() body: CreateVerifyDto) {
    return await this.verifyService.initiateVerification(body.certificate_id);
  }

  @Post('approve')
  async approve(@Body() body: ApproveVerifyDto) {
    const result = await this.verifyService.approveVerification(body.verification_id, body.approval_key);
    // this.verifyGateway.notifyEmployer(body.verification_id, body.approval_key);
    return { message: 'Verification approved', result };
  }
}
