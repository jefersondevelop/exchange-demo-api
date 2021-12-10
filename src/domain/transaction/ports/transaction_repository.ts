import { Transaction } from "../models/transaction";

export interface TransactionRepository {

    save(transaction: Transaction): Promise<Transaction | undefined>;

    getAll(): Promise<Transaction[] | undefined>;

    findByUser(id?: string): Promise<Transaction[] | undefined>;

}