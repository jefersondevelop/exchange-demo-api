import { EmailSendingService } from "../../../infra/adapters/email/email_sending_service";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";

import dotenv from 'dotenv';

dotenv.config();

export class ChangePassword {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService
    ) {
    }

    public async call(email: string | undefined, password: string, newPassword: string): Promise<{ message?: string, errorPassword?: any }> {
        let userByEmail = await this.userService.findUserByParam('email', email);

        if (userByEmail === undefined) {
            return { errorPassword: { code: 'UDI_03', message: 'User does not exists.', httpCode: 404 } };
        }

        let passwordMatch = await this.passwordService.passwordMatch(userByEmail.password, password);

        if (!passwordMatch) {
            return { errorPassword: { code: '', message: 'Password invalid.', httpCode: 409 } };
        }

        if (!newPassword) {
            return { errorPassword: { code: '', message: 'New password must be provided.', httpCode: 422 } }
        }

        let passwordEncoded = await this.passwordService.encodePassword(newPassword);

        userByEmail = userByEmail.withPassword(passwordEncoded);
        userByEmail = userByEmail.withEmptyRecoverHash();

        await this.userService.update(userByEmail);

        return { message: `User has changded his password successfully.` };

    }
}
