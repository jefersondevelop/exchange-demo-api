import { UserRepo } from '../adapters/user/mongo_user_repository'
import { RoleRepo } from '../adapters/role/mongo_role_repository'

import mongoose from 'mongoose';
import { Profile } from '../../domain/user/models/userProfile';
import { role, Role } from '../../domain/role/models/role';

import { config } from 'dotenv'

config();

export async function runUserSeed(): Promise<string | undefined> {

    const dbUri = process.env.DB_URI || ""

    mongoose.set('useFindAndModify', false);

    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    let promises: any[] = [];

    let profile = null;
    let roleAdmin = await RoleRepo.findOne({ name: role.ADMIN });
    let roleExchanger = await RoleRepo.findOne({ name: role.EXCHANGER });
    let roleA = await roleAdmin?.toJSON() as Role;
    roleA = new Role(
        roleA.id,
        roleA.name,
        roleA.description,
        roleA.isActive
    )
    let roleE = await roleExchanger?.toJSON() as Role;
    roleE = new Role(
        roleE.id,
        roleE.name,
        roleE.description,
        roleE.isActive
    )

    await [
        {
            email: 'admin@demo.com',
            username: 'Administrador',
            currentCountry: 'ARG',
            password: '12345678'
        },
        {
            email: 'exchanger@demo.com',
            username: 'Exchanger',
            currentCountry: 'ARG',
            password: '12345678'
        },
    ].map(async user => {
        profile = new Profile('', '', '',
            user.currentCountry, '', new Date().toISOString(), '', '',
            user.username, '', '', '', '', new Date().toISOString(), '', ''
        )
        if (user.username === 'Administrador') {
            promises.push(
                UserRepo.findOneAndUpdate({
                    email: user.email,
                    profile,
                    role: roleA,
                    password: "$2b$10$.VZyNs8BCZ3Jr5t7Sdh46.5hjGdkKMUVxh3Kl8LgFEUzaj22vUlNe"
                }, {}, {
                    upsert: true, new: true, rawResult: true
                })
            )
        } else {
            promises.push(
                UserRepo.findOneAndUpdate({
                    email: user.email,
                    profile,
                    role: roleE,
                    password: "$2b$10$.VZyNs8BCZ3Jr5t7Sdh46.5hjGdkKMUVxh3Kl8LgFEUzaj22vUlNe"
                }, {}, {
                    upsert: true, new: true, rawResult: true
                })
            )
        }
    })

    let result = await Promise.all(promises)

    if (result) {
        return "USERS: Seed Ran succesfully"
    }

    return "USERS: Seed NOT RAN"

}