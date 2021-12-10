import { isValidUUID } from "../../../infra/helpers/validateUUID";
import { Exchange } from "../models/exchange";
import { ExchangeService } from "../ports/exchange_service";

export class GetExchange {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    public async call(id: string): Promise<{ exchange?: Exchange, error?: any }> {
        try {
            if (!isValidUUID(id)) {
                return { error: { code: 'EDI_03', message: 'Invalid UUID', httpCode: 409 } }
            }
            const exchange = await this.exchangeService.findById(id);
            if (!exchange) {
                return { error: { code: 'EDI_02', message: 'Exchange does not exists.', httpCode: 404 } };
            }
            return { exchange };
        } catch (error) {
            return { error };
        }
    }
}
