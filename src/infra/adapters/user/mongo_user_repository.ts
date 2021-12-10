import * as mongoose from "mongoose";
import { User } from "../../../domain/user/models/user";
import { UserRepository } from "../../../domain/user/ports/user_repository";

const userSchema = new mongoose.Schema({
  name: String,
  profile: {
    address: String,
    city: String,
    state: String,
    currentCountry: String,
    birthCountry: String,
    birthdate: String,
    occupation: String,
    phoneNumber: String,
    username: String,
    lastname: String,
    dniFront: String,
    dniBack: String,
    selfie: String,
    documentDate: String,
    documentType: String,
    documentNumber: String
  },
  role: {
    name: String,
    description: String,
    isActive: Number
  },
  email: String,
  password: String,
  recoverhash: String
});

export const UserRepo = mongoose.model('User', userSchema);

export class MongoUserRepository implements UserRepository {

  async findUserByParam(param: string, value: string): Promise<User | undefined> {
    const user = await UserRepo.findOne({ [param]: value });
    const json = await user?.toJSON() as User;
    return user ?
      new User(
        user.id,
        json?.email,
        json?.profile,
        json?.role,
        json?.password,
        json?.recoverhash
      ) : undefined;
  }

  async update(user: User): Promise<User | undefined> {
    const userUpdated = await UserRepo.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        $set: user
      },
      {
        returnOriginal: false
      });
    const json = await userUpdated?.toJSON() as User;
    return userUpdated ?
      new User(
        user.id,
        json?.email,
        json?.profile,
        json?.role,
        json?.password,
        json?.recoverhash
      ) : undefined;
  }

  async save(user: User): Promise<User> {
    const savedUserDoc = await UserRepo.create(user);
    return user.withId(savedUserDoc.id);
  }

  async existUserByDni(dni: string | undefined): Promise<boolean> {
    const user = await UserRepo.findOne({ 'profile.dni': dni });
    return !!user;
  }

  async existUserByEmail(email: string | undefined): Promise<boolean> {
    const user = await UserRepo.findOne({ email: email });
    return !!user;
  }

  async existUserByPhoneNumber(phoneNumber: string | undefined): Promise<boolean> {
    const user = await UserRepo.findOne({ 'profile.phoneNumber': phoneNumber });
    return !!user;
  }

  async findByEmail(username: string): Promise<User | undefined> {
    const user = await UserRepo.findOne({ email: username });
    const json = await user?.toJSON() as User;
    return user ?
      new User(
        user.id,
        json?.email,
        json?.profile,
        json?.role,
        json?.password
      ) : undefined;
  }

  async findAll(): Promise<User[]> {

    let users = await UserRepo.find();
    let result: any[] = []
    if (users && users.length > 0) {
      result = users.map((user: any) => {
        const json = user?.toJSON() as User;
        return new User(
          user.id,
          json?.email,
          json?.profile,
          json?.role
        )
      })
    }

    if (!result || result === undefined) {
      return []
    }

    return result;

  }

}
