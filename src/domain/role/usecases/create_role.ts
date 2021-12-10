import { Role } from "../models/role";
import { RoleService } from "../ports/role_service";

export class CreateRole {
    constructor(private readonly roleService: RoleService) {
    }

    public async call(newRole: Role): Promise<{ role?: Role, error?: any }> {
        const existRoleByEmail = await this.roleService.existRoleByName(newRole.name);

        if (existRoleByEmail) {
            return { error: { code: 'RDI_01', message: 'Name Already in use' } };
        }

        return { role: await this.roleService.save(newRole) };
    }
}
