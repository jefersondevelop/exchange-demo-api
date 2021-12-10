import { Role } from "../models/role";

export interface RoleRepository {
    findAll(): Promise<Role[] | undefined>;

    save(role: Role): Promise<Role>;

    existRoleByName(name: string | undefined): Promise<boolean>;

    findByName(name: string | undefined): Promise<Role | undefined>;
}
