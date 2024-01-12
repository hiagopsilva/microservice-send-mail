import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import 'nodemailer';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
      },
    ),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        connectionName: process.env.REDIS_CONNECTION_NAME,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
    EmailModule,
  ],
})
export class AppModule {}
