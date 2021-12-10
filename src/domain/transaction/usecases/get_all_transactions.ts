import { Transaction } from "../models/transaction";
import { TransactionService } from "../ports/transaction_service";

export class GetAllTransactions {

    constructor(
        private readonly transactionService: TransactionService
    ) { }


    async call(): Promise<Transaction[] | undefined> {

        return this.transactionService.getAll();

    }

}