import * as mongoose from "mongoose";
import { Role } from "../../../domain/role/models/role";
import { RoleRepository } from "../../../domain/role/ports/role_repository";

const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean
});

export const RoleRepo = mongoose.model('Role', roleSchema);

export class MongoRoleRepository implements RoleRepository {

    async findAll(): Promise<Role[] | undefined> {
        const roles = await RoleRepo.find({});
        return roles.map((role: any) => {
            let { name, description }: any = role
            return new Role(
                role.id,
                name,
                description
            )
        });
    }


    async save(role: Role): Promise<Role> {
        const savedRoleDoc = await RoleRepo.create(role);
        return role.withId(savedRoleDoc.id);
    }

    async existRoleByName(name: string | undefined): Promise<boolean> {
        let regExp = new RegExp(`/^${name}$/`, 'i');
        const role = await RoleRepo.findOne({ name: { '$regex': regExp } });
        return !!role;
    }

    async findByName(name: string | undefined): Promise<Role | undefined> {
        const role = await RoleRepo.findOne({ name: name });
        const json = await role?.toJSON() as Role;
        return role ?
            new Role(
                role.id,
                json?.name,
                json?.description,
                json?.isActive
            ) : undefined;
    }

}