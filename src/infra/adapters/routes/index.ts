import express from "express";
import auth from './auth';
import roles from './roles';
import files from './file';
import users from './users';
import exchanges from './exchanges';
import transactions from './transactions';
require('dotenv').config();
const app = express();

let prefix = `/api/${process.env.APP_VERSION}`

app.use(`${prefix}/auth`, auth);
app.use(`${prefix}/roles`, roles);
app.use(`${prefix}/files`, files);
app.use(`${prefix}/users`, users);
app.use(`${prefix}/exchanges`, exchanges);
app.use(`${prefix}/transactions`, transactions);

export default app;