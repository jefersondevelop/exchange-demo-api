import { MongoUserRepository } from "../user/mongo_user_repository";
import { BasicUserService } from "../user/basic_user_service";
import { AuthController } from "../../controllers/auth_controller";
import { BcryptPasswordService } from "../user/bcrypt_password_service";
import { sign } from 'jsonwebtoken'
import { RegisterUser } from "../../../domain/user/usecases/register_user";
import { RecoverPass } from "../../../domain/user/usecases/recover_pass";
import { ValidatePass } from "../../../domain/user/usecases/validate_pass";
import { User } from "../../../domain/user/models/user";
import { LoginUser, JwtBuilder } from "../../../domain/user/usecases/login_user";
import { MongoRoleRepository } from "../role/mongo_role_repository";
import { BasicRoleService } from "../role/basic_role_service";
import { EmailSendingService } from "../email/email_sending_service";

const repo = new MongoUserRepository();
const roleRepo = new MongoRoleRepository();
const emailService = new EmailSendingService();

const service = new BasicUserService(repo);
const roleService = new BasicRoleService(roleRepo);
const passwordService = new BcryptPasswordService();
const registerUserUseCase = new RegisterUser(service, passwordService, roleService);
const loginUseCase = new LoginUser(service, passwordService, new class implements JwtBuilder {
    async createJwt(user: User): Promise<String> {
        const newToken = sign({ uid: user.id, email: user.email, role: user.role?.name }, 'mysecretjwt', {
            expiresIn: "1h"
        });
        return Promise.resolve(newToken);
    }
});
const recoverPass = new RecoverPass(service, passwordService, emailService);
const validatePass = new ValidatePass(service, passwordService)
const controller = new AuthController(registerUserUseCase, loginUseCase, recoverPass, validatePass);

export default controller;