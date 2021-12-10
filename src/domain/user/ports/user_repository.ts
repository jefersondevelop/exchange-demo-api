import { User } from "../models/user";

export interface UserRepository {
  save(user: User): Promise<User>;

  update(user: User): Promise<User | undefined>;

  existUserByPhoneNumber(phoneNumber: string | undefined): Promise<boolean>;

  existUserByEmail(email: string | undefined): Promise<boolean>;

  existUserByDni(dni: string | undefined): Promise<boolean>;

  findByEmail(username: string): Promise<User | undefined>;

  findUserByParam(param: string, value: string): Promise<User | undefined>;

  findAll(): Promise<User[]>;
}
