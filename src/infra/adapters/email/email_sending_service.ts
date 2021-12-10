import { SentMessageInfo } from "nodemailer";
import { EmailService } from "../../../domain/user/ports/email_service";
import smtpTrans from '../../config/email_config';

interface EmailOptions {
    to: string,
    subject: string,
    template: string,
    context?: any
}

export class EmailSendingService implements EmailService {

    async sendEmail(options: EmailOptions): Promise<{ message: SentMessageInfo }> {
        return new Promise((resolve, reject) => {
            var mailOptions = {
                to: options.to,
                from: `<process.env.EMAIL_USER>`,
                subject: options.subject,
                text: 'email test',
                template: options.template,
                context: options.context
            };
            smtpTrans.sendMail(mailOptions, (error, response) => {
                error ? reject({ message: error }) : resolve({ message: response });
                smtpTrans.close();
            });
        })

    }

}
