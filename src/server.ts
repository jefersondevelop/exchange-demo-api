import express, { Express } from "express";
import startDatabaseConnection from "./infra/config/moongose_config";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import morgan from 'morgan';
import routes from './infra/adapters/routes/index'
import fileUpload from 'express-fileupload'

const app = express() as Express;
const PORT = process.env.PORT || 3000;
let server: any;

export async function start() {

  await startDatabaseConnection()
  app.use(fileUpload())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'))
  app.use(routes);
  server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

}

export async function stop() {
  console.log("Shutting down server");
  await server.close();
  await mongoose.disconnect();
  console.log("Shouted down server");
}
