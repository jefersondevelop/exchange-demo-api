import { Role } from "../models/role";
import { RoleService } from "../ports/role_service";

export class GetRoleList {
    constructor(private readonly roleService: RoleService) {
    }

    public async call(): Promise<{ roles?: Role[], error?: any }> {
        try {

            const roles = await this.roleService.findAll();

            return { roles };
        } catch (error) {
            return { error };
        }
    }
}
