import { Exchange } from "../models/exchange";
import { ExchangeService } from "../ports/exchange_service";

export class UpdateExchange {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    public async call(exchangeEditable: Exchange): Promise<{ exchange?: Exchange, error?: any }> {

        const existsExchange = await this.exchangeService.findById(exchangeEditable.id);

        if (!existsExchange) {
            return { error: { code: 'EDI_02', message: 'Exchange does not exists.', httpCode: 404 } };
        }

        return { exchange: await this.exchangeService.update(exchangeEditable) };
    }
}
