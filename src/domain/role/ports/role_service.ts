import { Role } from "../models/role";

export interface RoleService {
  findAll(): Promise<Role[] | undefined>;

  save(role: Role): Promise<Role>;

  existRoleByName(name: string | undefined): Promise<boolean>;

  findByName(name: string): Promise<Role | undefined>;
}
