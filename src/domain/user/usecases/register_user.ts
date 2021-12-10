import { role } from "../../role/models/role";
import { RoleService } from "../../role/ports/role_service";
import { User } from "../models/user";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";

export class RegisterUser {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly roleService: RoleService
    ) {
    }

    public async call(newUser: User): Promise<{ user?: User, error?: any }> {
        const existUserByEmail = await this.userService.existUserByEmail(newUser.email);
        const roleExchanger = await this.roleService.findByName(role.EXCHANGER);

        newUser = await newUser.withRole(roleExchanger);

        if (existUserByEmail) {
            return { error: { code: 'UDI_01', message: 'Email Already in use', httpCode: 409 } };
        }

        const userWithEncodedPassword = newUser
            .withPassword(await this.passwordService.encodePassword(newUser.password));



        return { user: await this.userService.save(userWithEncodedPassword) };

    }
}
