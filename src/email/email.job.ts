"use strict";
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { createTransport } from 'nodemailer';

@Processor('emailQueue')
@Injectable()
export class EmailJob {
  @Process('sendEmail')
  async sendEmail(job: Job) {
    const { to, subject, text } = job.data;

    const transporter = createTransport({
      service: 'gmail',
      secure: true,
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }
}
