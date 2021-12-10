import { User } from "../models/user";
import { PasswordService } from "../ports/password_service";
import { UserService } from "../ports/user_service";


export interface JwtBuilder {

  createJwt(user: User): Promise<String>;
}

export class LoginUser {

  constructor(private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtBuilder: JwtBuilder) {
  }

  public async call(username: string, password: string): Promise<{ user?: any, error?: any }> {

    let user = await this.userService.findUserByEmail(username);
    if (!user) {
      return { error: { code: '', message: 'not user found' } };
    }
    const passwordMatch = await this.passwordService.passwordMatch(user.password, password);

    if (!passwordMatch) {
      return { error: { code: '', message: '' } };
    }

    user = await user.withPassword(undefined);
    user = await user.withRecoverHash(undefined);

    return { user: { token: await this.jwtBuilder.createJwt(user), user } };
  }

}
