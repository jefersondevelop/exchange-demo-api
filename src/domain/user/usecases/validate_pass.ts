import { EmailSendingService } from "../../../infra/adapters/email/email_sending_service";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";

import dotenv from 'dotenv';

dotenv.config();

export class ValidatePass {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService
    ) {
    }

    public async call(recoverHash: string, password: string): Promise<{ message?: string, error?: any }> {
        let userByHash = await this.userService.findUserByParam('recoverhash', recoverHash);

        if (userByHash === undefined) {
            return { error: { code: 'UDI_03', message: 'User has not asked by recover password.', httpCode: 404 } };
        }

        console.log(recoverHash, process.env.SEED_KEY)

        let passwordMatch = await this.passwordService.passwordMatch(recoverHash, process.env.SEED_KEY);

        if (!passwordMatch) {
            return { error: { code: '', message: 'Invalid token.', httpCode: 409 } };
        }

        let passwordEncoded = await this.passwordService.encodePassword(password);

        userByHash = userByHash.withPassword(passwordEncoded);

        await this.userService.update(userByHash);
        await this.userService.update(userByHash.withEmptyRecoverHash());

        return { message: `User has recovered password successfully.` };

    }
}
