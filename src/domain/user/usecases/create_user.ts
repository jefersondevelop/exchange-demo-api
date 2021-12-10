import { User } from "../models/user";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";

var i;
export class CreateUser {
  constructor(private readonly userService: UserService,
    private readonly passwordService: PasswordService) {
  }

  public async call(newUser: User): Promise<{ user?: User, error?: any }> {
    const existUserByEmail = await this.userService.existUserByEmail(newUser.email);

    if (existUserByEmail) {
      return { error: { code: 'UDI_01', message: 'Email Already in use', httpCode: 409 } };
    }

    const existUserByDni = await this.userService.existUserByDni(newUser?.profile?.documentNumber);

    if (existUserByDni) {
      return { error: { code: 'UDI_02', message: 'Identification number already in use', httpCode: 409 } };
    }

    const existUserByPhoneNumber = await this.userService.existUserByPhoneNumber(newUser?.profile?.phoneNumber);

    if (existUserByPhoneNumber) {
      return { error: { code: 'UDI_03', message: 'Phone number already in use', httpCode: 409 } };
    }

    const userWithEncodedPassword = newUser
      .withPassword(await this.passwordService.encodePassword(newUser.password));

    return { user: await this.userService.save(userWithEncodedPassword) };

  }
}
