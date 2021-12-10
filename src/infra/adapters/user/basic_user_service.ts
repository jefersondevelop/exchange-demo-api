import { User } from "../../../domain/user/models/user";
import { UserRepository } from "../../../domain/user/ports/user_repository";
import { UserService } from "../../../domain/user/ports/user_service";

export class BasicUserService implements UserService {

  constructor(private readonly userRepository: UserRepository) {
  }

  async update(user: User): Promise<User | undefined> {
    return await this.userRepository.update(user);
  }

  async existUserByDni(dni: string | undefined): Promise<boolean> {
    return await this.userRepository.existUserByDni(dni);
  }

  async existUserByEmail(email: string | undefined): Promise<boolean> {
    return await this.userRepository.existUserByEmail(email);
  }

  async existUserByPhoneNumber(phoneNumber: string | undefined): Promise<boolean> {
    return await this.userRepository.existUserByPhoneNumber(phoneNumber);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserByEmail(username: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(username);
  }

  async findUserByParam(param: string, value: string): Promise<User | undefined> {
    return await this.userRepository.findUserByParam(param, value);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
