import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailJob } from './email.job';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [EmailJob],
})
export class EmailModule {}
