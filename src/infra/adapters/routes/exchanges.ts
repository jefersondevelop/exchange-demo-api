import express from "express";
import { validateCreate } from "../../middlewares/validate-exchange-body";
import verifyUserLogged, { verifyAdminRole } from "../../middlewares/verify-auth";
import exchange from '../contexts/exchanges'
const app = express.Router();

app.get('/', (req, res) => { exchange.list(req, res) });
app.post('/', [verifyUserLogged, verifyAdminRole, validateCreate], (req: any, res: any) => { exchange.save(req, res) });
app.delete('/:id', [verifyUserLogged, verifyAdminRole], (req: any, res: any) => { exchange.delete(req, res) });
app.get('/:id', [verifyUserLogged, verifyAdminRole], (req: any, res: any) => { exchange.getExchangeDetails(req, res) });
app.put('/', [verifyUserLogged, verifyAdminRole, validateCreate], (req: any, res: any) => { exchange.updateDetails(req, res) });

export default app;