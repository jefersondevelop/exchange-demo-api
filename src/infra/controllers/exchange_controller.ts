import { Request, Response } from "express";
import { Exchange } from "../../domain/exchange/models/exchange";
import { CreateExchange } from "../../domain/exchange/usecases/create_exchange";
import { DeleteExchange } from "../../domain/exchange/usecases/delete_exchange";
import { GetExchange } from "../../domain/exchange/usecases/get_exchange";
import { GetExchangeList } from "../../domain/exchange/usecases/get_exchanges";
import { UpdateExchange } from "../../domain/exchange/usecases/update_exchange";

export class ExchangeController {

    constructor(
        private readonly getExchangeList: GetExchangeList,
        private readonly saveExchange: CreateExchange,
        private readonly deleteExchange: DeleteExchange,
        private readonly getExchange: GetExchange,
        private readonly updateExchange: UpdateExchange
    ) {
    }

    public async list(req: Request, res: Response) {
        try {

            const { exchanges, error } = await this.getExchangeList.call();

            if (error) {
                throw error;
            }

            return res.json({ data: exchanges });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

    public async save(req: Request, res: Response) {
        try {
            let newExchange = req.body as Exchange;
            const { exchange, error } = await this.saveExchange.call(newExchange);

            if (error) {
                return res.status(error?.httpCode ? error.httpCode : 500).json({ message: error.message })
            }

            return res.json({ data: exchange, message: 'Exchange created successfully.' });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

    public async delete(req: Request, res: Response) {

        try {
            let { id } = req.params;
            const { exchange, error } = await this.deleteExchange.call(id);

            if (error) {
                return res.status(error?.httpCode ? error.httpCode : 500).json({ message: error.message })
            }

            return res.json({ data: exchange, message: 'Exchange delete succesfully' })

        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }

    }

    public async getExchangeDetails(req: Request, res: Response) {

        try {
            let { id } = req.params;
            const { exchange, error } = await this.getExchange.call(id);

            if (error) {
                return res.status(error?.httpCode ? error.httpCode : 500).json({ message: error.message })
            }

            return res.json({ data: exchange })

        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }

    }

    public async updateDetails(req: Request, res: Response) {

        try {
            const { exchange, error } = await this.updateExchange.call(req.body);

            if (error) {
                return res.status(error?.httpCode ? error.httpCode : 500).json({ message: error.message })
            }

            return res.json({ data: exchange, message: 'Exchange updated succesfully' })

        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }

    }

}
