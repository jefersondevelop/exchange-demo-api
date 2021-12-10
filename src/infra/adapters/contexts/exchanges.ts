import { MongoExchangeRepository } from "../exchange/mongo_exchange_repository";
import { BasicExchangeService } from "../exchange/basic_exchange_service";
import { GetExchangeList } from "../../../domain/exchange/usecases/get_exchanges";
import { ExchangeController } from "../../controllers/exchange_controller";
import { CreateExchange } from "../../../domain/exchange/usecases/create_exchange";
import { DeleteExchange } from "../../../domain/exchange/usecases/delete_exchange";
import { GetExchange } from "../../../domain/exchange/usecases/get_exchange";
import { UpdateExchange } from "../../../domain/exchange/usecases/update_exchange";

const repo = new MongoExchangeRepository();

const service = new BasicExchangeService(repo);
const listExchangeUC = new GetExchangeList(service);
const createExchangeUC = new CreateExchange(service);
const deleteExchangeUC = new DeleteExchange(service);
const getExchangeUC = new GetExchange(service);
const updateExchangeUC = new UpdateExchange(service);
const controller = new ExchangeController(listExchangeUC, createExchangeUC, deleteExchangeUC, getExchangeUC, updateExchangeUC);

export default controller;