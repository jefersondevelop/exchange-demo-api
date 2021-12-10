import { Role } from "../../role/models/role";
import { Profile } from "./userProfile";

export enum UserStatus {
  PENDING_FOR_DOCUMENT = 'PENDING_FOR_DOCUMENT'
}

export class User {
  static value = 10
  constructor(
    public readonly id?: string,
    public readonly email?: string,
    public readonly profile?: Profile,
    public readonly role?: Role,
    public readonly password?: string,
    public readonly recoverhash?: string,
    public readonly status: string = UserStatus.PENDING_FOR_DOCUMENT) {
  }

  public withPassword(encodePassword?: string): User {
    return new User(
      this.id,
      this.email,
      this.profile,
      this.role,
      encodePassword,
      undefined,
      this.status
    );
  }

  public withId(id: string): User {
    return new User(
      id,
      this.email,
      this.profile,
      this.role,
      this.password,
      undefined,
      this.status
    );
  }

  public withRole(role: Role | undefined): User {
    return new User(
      this.id,
      this.email,
      this.profile,
      role,
      this.password,
      undefined,
      this.status
    );
  }

  public withProfile(profile: Profile | undefined): User {
    return new User(
      this.id,
      this.email,
      profile,
      this.role,
      this.password,
      undefined,
      this.status
    );
  }


  public withRecoverHash(hash: string | undefined): User {
    return new User(
      this.id,
      this.email,
      this.profile,
      this.role,
      this.password,
      hash,
      this.status
    );
  }

  public withEmptyRecoverHash(): User {
    return new User(
      this.id,
      this.email,
      this.profile,
      this.role,
      this.password,
      undefined,
      this.status
    );
  }

  public withOnlyProfile(): Profile | undefined {
    return this.profile;
  }

}
