import { Exchange } from "../models/exchange";
import { ExchangeService } from "../ports/exchange_service";

export class CreateExchange {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    public async call(newExchange: Exchange): Promise<{ exchange?: Exchange, error?: any }> {
        const existExchangeBySourceAndTargetName = await this.exchangeService.existExchangeBySourceAndTargetName(newExchange.sourceName, newExchange.targetName);

        if (existExchangeBySourceAndTargetName) {
            return { error: { code: 'EDI_01', message: 'Source and Target Name Already in use', httpCode: 409 } };
        }

        return { exchange: await this.exchangeService.save(newExchange) };
    }
}
