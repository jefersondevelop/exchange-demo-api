import express from "express";
import { validateRegister, validateLogin, validateRecover, validateValidatePass } from "../../middlewares/validate-auth-body";
import auth from '../contexts/auth'
const app = express.Router();

app.post('/register', validateRegister, (req, res) => { auth.handleRegisterUser(req, res) });
app.post('/recover', validateRecover, (req, res) => { auth.recoverPassword(req, res) });
app.post('/login', validateLogin, (req, res) => { auth.handleLogin(req, res) });
app.post('/validatepass', validateValidatePass, (req, res) => { auth.validateUserPass(req, res) });

export default app;