import * as mongoose from "mongoose";
import { Transaction } from "../../../domain/transaction/models/transaction";
import { TransactionRepository } from "../../../domain/transaction/ports/transaction_repository";

const transactionSchema = new mongoose.Schema({
    targetCountry: String,
    comission: String,
    source: String,
    target: String,
    valueSent: Number,
    valueToSent: Number,
    date: Date,
    status: String,
    account: {
        reciptAccount: String,
        reciptEmail: String,
        reciptName: String,
        reciptPhone: String,
        userId: String,
    }
});

export const TransactionRepo = mongoose.model('Transaction', transactionSchema);

export class MongoTransactionRepo implements TransactionRepository {

    async save(transaction: Transaction): Promise<Transaction | undefined> {
        const transactionDoc = await TransactionRepo.create(transaction);
        return transaction.withId(transactionDoc.id);
    }
    async getAll(): Promise<Transaction[] | undefined> {
        let transactions = await TransactionRepo.find();
        let result: any[] = []
        if (transactions && transactions.length > 0) {
            result = transactions.map((transaction: any) => {
                const json = transaction?.toJSON() as Transaction;
                return new Transaction(
                    transaction.id,
                    json?.targetCountry,
                    json?.comission,
                    json?.source,
                    json?.target,
                    json?.valueSent,
                    json?.valueToSent,
                    json?.date,
                    json?.status,
                    json?.account
                )
            })
        }

        if (!result || result === undefined) {
            return []
        }

        return result;
    }
    async findByUser(id?: string): Promise<Transaction[] | undefined> {
        let transactions = await TransactionRepo.find({ userId: id });
        let result: any[] = []
        if (transactions && transactions.length > 0) {
            result = transactions.map((transaction: any) => {
                const json = transaction?.toJSON() as Transaction;
                return new Transaction(
                    transaction.id,
                    json?.targetCountry,
                    json?.comission,
                    json?.source,
                    json?.target,
                    json?.valueSent,
                    json?.valueToSent,
                    json?.date,
                    json?.status,
                    json?.account
                )
            })
        }

        if (!result || result === undefined) {
            return []
        }

        return result;
    }

}