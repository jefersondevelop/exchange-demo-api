import { Request, Response } from "express";
import { User } from "../../domain/user/models/user";
import { Profile } from "../../domain/user/models/userProfile";
import { RegisterUser } from "../../domain/user/usecases/register_user";
import { LoginUser } from "../../domain/user/usecases/login_user";
import { RecoverPass } from "../../domain/user/usecases/recover_pass";
import { ValidatePass } from "../../domain/user/usecases/validate_pass";

export class AuthController {

  constructor(private readonly createUser: RegisterUser,
    private readonly loginUser: LoginUser,
    private readonly recoverPass: RecoverPass,
    private readonly validatePass: ValidatePass
  ) {
  }

  public async validateUserPass(req: Request, res: Response) {
    try {
      const { message, error } = await this.validatePass.call(req.body.recoverHash, req.body.password);

      if (error) {
        return res.status(error.httpCode).json({ message: error.message })
      }

      return res.status(200).json({ message })

    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  public async recoverPassword(req: Request, res: Response) {
    try {
      const { message, error } = await this.recoverPass.call(req.body.email);

      if (error) {
        return res.status(error.httpCode).json({ message: error.message })
      }

      return res.status(200).json({ message })

    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  public async handleRegisterUser(req: Request, res: Response) {
    try {
      const newP = new Profile(
        '',
        '',
        '',
        req.body.currentCountry,
        '',
        new Date().toISOString(),
        '',
        '',
        req.body.username,
        '',
        '',
        '',
        '',
        new Date().toISOString(),
        '',
        ''
      )
      const newU = new User(
        undefined,
        req.body.email,
        newP,
        undefined,
        req.body.password,
      );
      const { user, error } = await this.createUser.call(newU);
      if (error) {
        return res.status(error.httpCode ? error.httpCode : 500).json(error);
      }
      return res.json({ message: 'User register successfully', data: user?.withPassword(undefined) });
    } catch (e) {
      console.error("AuthController::handleRegisterUser", e)
      return res.status(500).json("Ups something wrong happened try again later")
    }
  }

  public async handleLogin(req: Request, res: Response) {
    try {

      const { user, error } = await this.loginUser.call(req.body.email, req.body.password);
      if (error) {
        return res.status(404).json({ ...error, message: 'Invalid username or password' });
      }
      return res.json({ data: user });
    } catch (e) {
      console.error("AuthController::handleLogin", e)
      return res.status(500).json("Ups something wrong happened try again later")
    }
  }

}
