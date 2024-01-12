import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailJob } from './email.job';
import { EmailController } from './email.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  controllers: [
    EmailController
  ],
  providers: [EmailJob],
})
export class EmailModule {}
