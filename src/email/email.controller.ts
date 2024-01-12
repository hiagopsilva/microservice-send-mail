import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('email')
export class EmailController {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.emailQueue.add('sendEmail', body);
    return { status: 'E-mail adicionado à fila' };
  }
}
