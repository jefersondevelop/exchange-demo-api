import { Exchange } from "../models/exchange";
import { ExchangeService } from "../ports/exchange_service";

export class GetExchangeList {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    public async call(): Promise<{ exchanges?: Exchange[], error?: any }> {
        try {

            const exchanges = await this.exchangeService.findAll();

            return { exchanges };
        } catch (error) {
            return { error };
        }
    }
}
