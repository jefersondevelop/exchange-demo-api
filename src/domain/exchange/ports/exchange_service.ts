import { Exchange } from "../models/exchange";

export interface ExchangeService {
    findAll(): Promise<Exchange[] | undefined>;

    save(exchange: Exchange): Promise<Exchange>;

    update(exchange: Exchange): Promise<Exchange | undefined>;

    existExchangeBySourceAndTargetName(sourceName: string | undefined, targetName: string | undefined): Promise<boolean>;

    findById(id: string | undefined): Promise<Exchange | undefined>;

    delete(id: string | undefined): Promise<Exchange | undefined>;
}
