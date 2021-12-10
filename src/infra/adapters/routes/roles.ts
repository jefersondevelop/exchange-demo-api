import express from "express";
import role from '../contexts/role'
const app = express.Router();

app.get('/', (req, res) => { role.list(req, res) });

export default app;