import { Exchange } from "../../../domain/exchange/models/exchange";
import { ExchangeRepository } from "../../../domain/exchange/ports/exchange_repository";
import { ExchangeService } from "../../../domain/exchange/ports/exchange_service";

export class BasicExchangeService implements ExchangeService {

    constructor(private readonly exchangeRepository: ExchangeRepository) {
    }
    delete(id: string | undefined): Promise<Exchange | undefined> {
        return this.exchangeRepository.delete(id)
    }
    findAll(): Promise<Exchange[] | undefined> {
        return this.exchangeRepository.findAll();
    }
    save(exchange: Exchange): Promise<Exchange> {
        return this.exchangeRepository.save(exchange);
    }
    existExchangeBySourceAndTargetName(sourceName: string | undefined, targetName: string | undefined): Promise<boolean> {
        return this.exchangeRepository.existExchangeBySourceAndTargetName(sourceName, targetName);
    }
    findById(id: string): Promise<Exchange | undefined> {
        return this.exchangeRepository.findById(id);
    }
    update(exchange: Exchange): Promise<Exchange | undefined> {
        return this.exchangeRepository.update(exchange)
    }
}
