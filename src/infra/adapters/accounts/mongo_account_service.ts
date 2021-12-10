import * as mongoose from "mongoose";
import { Account } from "../../../domain/account/models/account";
import { AccountRepository } from "../../../domain/account/ports/account_repository";

const accountSchema = new mongoose.Schema({
    reciptAccount: String,
    reciptEmail: String,
    reciptName: String,
    reciptPhone: String,
    userId: String,
});

export const AccountRepo = mongoose.model('Account', accountSchema);

export class MongoAccountRepository implements AccountRepository {

    constructor() { }

    async save(account: Account): Promise<Account | undefined> {
        let accountSaved = await AccountRepo.create(account);
        return account.withId(accountSaved.id)
    }
    async findByAccountNumberWithUser(accountNumber: string | undefined, userId: string | undefined): Promise<Account | undefined> {
        const account = await AccountRepo.findOne({ reciptAccount: accountNumber, userId });
        const json = await account?.toJSON() as Account;
        return account ?
            new Account(
                account.id,
                json?.reciptAccount,
                json?.reciptEmail,
                json?.reciptName,
                json?.reciptPhone,
                json?.userId
            ) : undefined;

    }
    async existsByAccountNumber(accountNumber: string | undefined): Promise<Boolean | undefined> {
        const account = await AccountRepo.findOne({ reciptAccount: accountNumber });
        return !!account;
    }

}