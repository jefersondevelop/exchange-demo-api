import { Request, Response } from "express";
import { GetOneByRoleName } from "../../domain/role/usecases/get_one_by_role_name";
import { GetRoleList } from "../../domain/role/usecases/get_role_list";

export class RoleController {

    constructor(
        private readonly getRoleList: GetRoleList
    ) {
    }

    public async list(req: Request, res: Response) {
        try {

            const { roles, error } = await this.getRoleList.call();

            if (error) {
                throw error;
            }

            return res.json({ roles });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

}
