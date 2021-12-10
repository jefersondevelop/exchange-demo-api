import { Account } from "../models/account";
import { AccountService } from "../ports/account_service";

export class CreateAccount {
    constructor(private readonly accountService: AccountService) {
    }

    public async call(newAccount: Account): Promise<{ account?: Account, error?: any }> {
        const existAccountBySourceAndTargetName = await this.accountService.findByAccountNumberWithUser(newAccount.reciptAccount, newAccount.userId);

        if (existAccountBySourceAndTargetName) {
            return { error: { code: 'ADI_01', message: 'Account already exists for user.', httpCode: 409 } };
        }

        return { account: await this.accountService.save(newAccount) };
    }
}
