import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import nodemailer from 'nodemailer';

@Processor('emailQueue')
@Injectable()
export class EmailJob {
  @Process('sendEmail')
  async sendEmail(job: Job) {
    const { to, subject, text } = job.data;

    console.log({
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
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
