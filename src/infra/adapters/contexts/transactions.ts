import { CreateTransaction } from "../../../domain/transaction/usecases/create_transaction";
import { GetTransactionByUser } from "../../../domain/transaction/usecases/get_transactions_by_user";
import { TransactionController } from "../../controllers/transaction_controller";
import { BasicAccountService } from "../accounts/basic_account_service";
import { MongoAccountRepository } from "../accounts/mongo_account_service";
import { BasicTransactionService } from "../transactions/basic_transaction_service";
import { MongoTransactionRepo } from "../transactions/mongo_account_repository";


const repo = new MongoTransactionRepo();
const accountRepo = new MongoAccountRepository()

const service = new BasicTransactionService(repo);
const accountService = new BasicAccountService(accountRepo)
const executeTransaction = new CreateTransaction(service, accountService);
const getHistoric = new GetTransactionByUser(service)
const controller = new TransactionController(executeTransaction, getHistoric);

export default controller;