export interface PasswordService {
  encodePassword(password: string | undefined): Promise<string>;

  passwordMatch(hashedPassword: string | undefined, rawPassword: string | undefined): Promise<boolean>;
}
