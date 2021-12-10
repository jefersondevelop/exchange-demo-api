import { User } from "../models/user";
import { UserService } from "../ports/user_service";

export class GetProfileUser {

    constructor(private readonly userService: UserService) {
    }

    public async call(email: string | undefined): Promise<{ user?: User, error?: any }> {

        let user = await this.userService.findUserByEmail(email);
        if (!user) {
            return { error: { code: '', message: 'not user found' } };
        }

        user = await user.withPassword(undefined);
        user = await user.withRecoverHash(undefined);

        return { user };
    }

}
