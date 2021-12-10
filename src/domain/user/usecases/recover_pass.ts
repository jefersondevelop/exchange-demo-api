import { EmailSendingService } from "../../../infra/adapters/email/email_sending_service";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";

import dotenv from 'dotenv';

dotenv.config();

export class RecoverPass {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly emailService: EmailSendingService
    ) {
    }

    public async call(email: string): Promise<{ message?: string, error?: any }> {
        try {

            let existUserByEmail = await this.userService.existUserByEmail(email);
            if (!existUserByEmail) {
                return { error: { code: 'UDI_03', message: 'User does not Exists.', httpCode: 404 } };
            }

            let user = await this.userService.findUserByEmail(email);
            const tempPassHashed = await this.passwordService.encodePassword(process.env.SEED_KEY || 'XXChange-demo');

            user = user?.withRecoverHash(tempPassHashed);

            let recoverlink = `${process.env.CLIENT_URL}/recoverpass?token=${tempPassHashed}`;

            let result = await this.emailService.sendEmail({
                to: user?.email ? user.email : '',
                subject: 'Recovering password',
                template: 'recoverpass',
                context: { link: recoverlink }
            })

            if (!result) {
                return { error: { code: 'EDI_01', message: 'Email did not sent.', httpCode: 500 } }
            }
            await this.userService.update(user);

            return { message: `Email with instructions sent.` };
        } catch (error) {
            console.log({ error })
            throw error;
        }

    }
}
