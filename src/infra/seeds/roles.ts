import { RoleRepo } from '../adapters/role/mongo_role_repository'

import mongoose from 'mongoose';

export async function runRoleSeed(): Promise<string | undefined> {

    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_NAME || 'testing';

    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`

    mongoose.set('useFindAndModify', false);

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let promises: any[] = [];

    await [
        {
            name: 'ADMIN',
            description: 'Admin of app.'
        },
        {
            name: 'EXCHANGER',
            description: 'User that change money.'
        }
    ].map(role => {
        promises.push(RoleRepo.findOneAndUpdate({
            name: role.name,
            description: role.description,
            isActive: true
        }, {}, {
            upsert: true, new: true, rawResult: true
        }))
    })

    let result = await Promise.all(promises)

    if (result) {
        return "ROLE: Seed Ran succesfully"
    }

    return "ROLE: Seed NOT RAN"

}