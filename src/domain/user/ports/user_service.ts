import { User } from "../models/user";

export interface UserService {
    save(user: User): Promise<User>;

    update(update: User | undefined): Promise<User | undefined>;

    existUserByPhoneNumber(phoneNumber: string | undefined): Promise<boolean>;

    existUserByEmail(email: string | undefined): Promise<boolean>;

    existUserByDni(dni: string | undefined): Promise<boolean>;

    findUserByEmail(username: string | undefined): Promise<User | undefined>;

    findUserByParam(param: string, value: string | undefined): Promise<User | undefined>;

    findAll(): Promise<User[]>;
}
