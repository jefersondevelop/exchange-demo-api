import { Transaction } from "../../../domain/transaction/models/transaction";
import { TransactionRepository } from "../../../domain/transaction/ports/transaction_repository";
import { TransactionService } from "../../../domain/transaction/ports/transaction_service";

export class BasicTransactionService implements TransactionService {

    constructor(
        private readonly transactionRepo: TransactionRepository
    ) { }

    save(transaction: Transaction): Promise<Transaction | undefined> {
        return this.transactionRepo.save(transaction);
    }
    getAll(): Promise<Transaction[] | undefined> {
        return this.transactionRepo.getAll();
    }
    findByUser(id?: string): Promise<Transaction[] | undefined> {
        return this.transactionRepo.findByUser(id);
    }

}