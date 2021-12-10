import { Account } from "../../account/models/account";
import { AccountService } from "../../account/ports/account_service";
import { Transaction, TransactionStatus } from "../models/transaction";
import { TransactionService } from "../ports/transaction_service";

export class CreateTransaction {
    constructor(
        private readonly transactionService: TransactionService,
        private readonly accountService: AccountService
    ) {
    }

    public async call(newTransaction: Transaction): Promise<{ transaction?: Transaction, error?: any }> {

        let accountData = new Account(
            undefined,
            newTransaction.account?.reciptAccount,
            newTransaction.account?.reciptEmail,
            newTransaction.account?.reciptName,
            newTransaction.account?.reciptPhone,
            newTransaction.account?.userId
        )

        let transactionToSave = new Transaction(
            undefined,
            newTransaction.targetCountry,
            newTransaction.comission,
            newTransaction.source,
            newTransaction.target,
            newTransaction.valueSent,
            newTransaction.valueToSent,
            new Date(),
            TransactionStatus.PENNDING,
            accountData
        )

        let account = await this.accountService.findByAccountNumberWithUser(accountData?.reciptAccount, accountData?.userId);

        if (!account) {
            await this.accountService.save(accountData);
        }


        return { transaction: await this.transactionService.save(transactionToSave) };
    }
}
