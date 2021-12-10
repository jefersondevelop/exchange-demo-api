import bcrypt from 'bcrypt';
import { PasswordService } from '../../../domain/user/ports/password_service';

export class BcryptPasswordService implements PasswordService {
  private readonly saltRounds = 10;

  async encodePassword(password: string | undefined): Promise<string> {
    const encodedPassword = await bcrypt.hash(password, this.saltRounds);
    return encodedPassword;
  }

  async passwordMatch(hashedPassword: string | undefined, rawPassword: string | undefined): Promise<boolean> {
    return await bcrypt.compare(rawPassword, <string>hashedPassword);
  }

}
