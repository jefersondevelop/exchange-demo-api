import { Request, Response } from "express";
import { CreateTransaction } from "../../domain/transaction/usecases/create_transaction";
import { GetTransactionByUser } from "../../domain/transaction/usecases/get_transactions_by_user";

export class TransactionController {

    constructor(
        private readonly createTransaction: CreateTransaction,
        private readonly getAllByUser: GetTransactionByUser
    ) {
    }

    async executeTransaction(req: Request, response: Response) {
        try {
            const { transaction, error }: any = await this.createTransaction.call(req.body)

            if (error) {
                return response.status(error.httpCode ? error.httpCode : 500).json({ code: error.code, message: error.message });
            }

            return response.json({ data: transaction, message: 'Transaction made successfully.' });

        } catch (error) {
            console.log(error)
            return response.status(500).json(error)
        }

    }

    async getTransactionHistoric(req: any, response: Response) {
        try {

            let result = await this.getAllByUser.call(req.user?.uid)

            response.json({ data: result, message: 'Transactions loaded.' });

        } catch (error) {
            console.log(error)
            return response.status(500).json(error)
        }

    }

}