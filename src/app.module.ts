import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EmailModule,
  ],
})
export class AppModule {}
