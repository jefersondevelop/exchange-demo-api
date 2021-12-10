import express from "express";
import verifyUserLogged from "../../middlewares/verify-auth";
import transactions from '../contexts/transactions'
const app = express.Router();

app.post('/', [verifyUserLogged], (req: any, res: any) => { transactions.executeTransaction(req, res) });
app.get('/', [verifyUserLogged], (req: any, res: any) => { transactions.getTransactionHistoric(req, res) });

export default app;