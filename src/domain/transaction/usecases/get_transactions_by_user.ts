import { Transaction } from "../models/transaction";
import { TransactionService } from "../ports/transaction_service";

export class GetTransactionByUser {

    constructor(
        private readonly transactionService: TransactionService
    ) { }

    async call(userId: string | undefined): Promise<Transaction[] | undefined> {
        return this.transactionService.findByUser(userId);
    }

}