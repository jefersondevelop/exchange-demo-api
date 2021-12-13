import { ExchangeRepo } from '../adapters/exchange/mongo_exchange_repository'

import mongoose from 'mongoose';

export async function runExchangeSeed(): Promise<string | undefined> {


    const dbUri = process.env.DB_URI || ""

    mongoose.set('useFindAndModify', false);

    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    let promises: any[] = []

    await [
        {
            sourceName: 'Paypal (USD)',
            targetName: 'Pesos (ARS)',
            type: "Pesos Argentinos",
            comission: "0.065",
            finalValue: "16.00",
            isActive: true
        },
        {
            sourceName: 'Paypal (USD)',
            targetName: 'Payoneer (USD)',
            type: "Dólares",
            comission: "0.005",
            finalValue: "1.50",
            isActive: true
        },
        {
            sourceName: 'Paypal (USD)',
            targetName: 'Venezuela (BS)',
            type: "Bolivares",
            comission: "0.00005",
            finalValue: "3000000.00",
            isActive: true
        },
        {
            sourceName: 'Pesos (ARS)',
            targetName: 'Paypal (USD)',
            type: "Dólares",
            comission: "0.05",
            finalValue: "0.06",
            isActive: true
        },
        {
            sourceName: 'Pesos (ARS)',
            targetName: 'Venezuela (BS)',
            type: "Dólares",
            comission: "0.5",
            finalValue: "5300000.00",
            isActive: true
        },
        {
            sourceName: 'Pesos (ARS)',
            targetName: 'Payoneer (USD)',
            type: "Dólares",
            comission: "0.052",
            finalValue: "0.05",
            isActive: true
        },
        {
            sourceName: 'Pesos (ARS)',
            targetName: 'Pesos (COP)',
            type: "Pesos Colombianos",
            comission: "0.052",
            finalValue: "0.05",
            isActive: true
        },
        {
            sourceName: 'Payoneer (USD)',
            targetName: 'Pesos (ARS)',
            type: "Pesos Argentinos",
            comission: "0.052",
            finalValue: "0.05",
            isActive: true
        },
    ].map(async exchange => {
        promises.push(ExchangeRepo.findOneAndUpdate({
            sourceName: exchange.sourceName,
            targetName: exchange.targetName,
            type: exchange.type,
            comission: exchange.comission,
            finalValue: exchange.finalValue,
            isActive: exchange.isActive
        }, {}, {
            upsert: true, new: true, rawResult: true
        }))
    })
    let result = await Promise.all(promises);

    if (result) {
        return "EXCHANGE: Seed Ran succesfully"
    }

    return "EXCHANGE: Seed NOT RAN";

}