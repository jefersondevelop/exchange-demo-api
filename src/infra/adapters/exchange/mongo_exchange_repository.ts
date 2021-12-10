import * as mongoose from "mongoose";
import { Exchange } from "../../../domain/exchange/models/exchange";
import { ExchangeRepository } from "../../../domain/exchange/ports/exchange_repository";

const exchangeSchema = new mongoose.Schema({
    targetName: String,
    sourceName: String,
    type: String,
    comission: String,
    finalValue: String,
    isActive: Boolean
});

export const ExchangeRepo = mongoose.model('Exchange', exchangeSchema);

export class MongoExchangeRepository implements ExchangeRepository {

    async findAll(): Promise<Exchange[] | undefined> {
        const exchanges = await ExchangeRepo.find({});
        return exchanges.map((exchange: any) => {
            let {
                targetName,
                sourceName,
                type,
                comission,
                finalValue,
                isActive
            }: any = exchange
            return new Exchange(
                exchange.id,
                targetName,
                sourceName,
                type,
                comission,
                finalValue,
                isActive
            )
        });
    }


    async save(exchange: Exchange): Promise<Exchange> {
        const savedExchangeDoc = await ExchangeRepo.create(exchange);
        const json = await savedExchangeDoc?.toJSON() as Exchange;
        return new Exchange(
            savedExchangeDoc.id,
            json.targetName,
            json.sourceName,
            json.type,
            json.comission,
            json.finalValue,
            json.isActive
        )
    }

    async existExchangeBySourceAndTargetName(sourceName: string | undefined, targetName: string | undefined): Promise<boolean> {
        const exchange = await ExchangeRepo.findOne({ sourceName, targetName });
        return !!exchange;
    }

    async findById(id: string | undefined): Promise<Exchange | undefined> {
        const exchange = await ExchangeRepo.findById(id);
        const json = await exchange?.toJSON() as Exchange;
        return exchange ?
            new Exchange(
                exchange.id,
                json?.targetName,
                json?.sourceName,
                json?.type,
                json?.comission,
                json?.finalValue,
                json?.isActive
            ) : undefined;
    }

    async delete(id: string | undefined): Promise<Exchange | undefined> {
        let exchange = this.findById(id);
        await ExchangeRepo.deleteOne({ _id: id })
        return exchange;
    }

    async update(exchange: Exchange): Promise<Exchange | undefined> {
        const exchangeUpdated = await ExchangeRepo.findOneAndUpdate(
            {
                _id: exchange.id,
            },
            {
                $set: exchange
            },
            {
                returnOriginal: false
            });
        const json = await exchangeUpdated?.toJSON() as Exchange;
        return exchangeUpdated ?
            new Exchange(
                exchange.id,
                json?.targetName,
                json?.sourceName,
                json?.type,
                json?.comission,
                json?.finalValue,
                json?.isActive
            ) : undefined;
    }

}