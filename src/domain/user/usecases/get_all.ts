import { User } from "../models/user";
import { UserService } from "../ports/user_service";

export class GetAllUsers {

    constructor(private readonly userService: UserService) {
    }

    public async call(): Promise<{ users?: User[], error?: any }> {

        let users = await this.userService.findAll();

        return { users };
    }

}
