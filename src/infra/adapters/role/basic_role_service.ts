import { Role } from "../../../domain/role/models/role";
import { RoleRepository } from "../../../domain/role/ports/role_repository";
import { RoleService } from "../../../domain/role/ports/role_service";

export class BasicRoleService implements RoleService {

    constructor(private readonly roleRepository: RoleRepository) {
    }
    findAll(): Promise<Role[] | undefined> {
        return this.roleRepository.findAll();
    }
    save(role: Role): Promise<Role> {
        return this.roleRepository.save(role);
    }
    existRoleByName(name: string | undefined): Promise<boolean> {
        return this.roleRepository.existRoleByName(name);
    }
    findByName(name: string): Promise<Role | undefined> {
        return this.roleRepository.findByName(name);
    }
}
