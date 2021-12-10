import { Role } from "../models/role";
import { RoleService } from "../ports/role_service";

export class GetOneByRoleName {
    constructor(private readonly roleService: RoleService) {
    }

    public async call(name: string): Promise<{ role?: Role, error?: any }> {
        try {

            if (!name || name === '') {
                return { error: { code: 'RDI_02', message: 'Name must be provided.' } };
            }

            const role = await this.roleService.findByName(name);

            return { role };
        } catch (error) {
            return { error };
        }
    }
}
