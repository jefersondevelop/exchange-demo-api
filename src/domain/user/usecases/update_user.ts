import { FileService } from "../../files/ports/file_service";
import { User } from "../models/user";
import { Profile } from "../models/userProfile";
import { UserService } from "../ports/user_service";

export class UpdateUserProfile {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService
    ) {
    }

    public async call(email: string | undefined, profile: Profile): Promise<{ user?: User, error?: any }> {
        const existUserByEmail = await this.userService.findUserByEmail(email);

        if (!existUserByEmail) {
            return { error: { code: 'UDI_03', message: 'User does not Exists.', httpCode: 404 } };
        }

        let profileWithDnis = {
            ...profile
        } as Profile;

        if (typeof profile.dniBack !== 'string' || typeof profile.dniFront !== 'string') {

            let result = await this.fileService.uploadFile('dnis', existUserByEmail.id, profile.dniBack);

            if (result.error) {
                return { error: result.error }
            }

            let dniBack = result.filePath;

            result = await this.fileService.uploadFile('dnis', existUserByEmail.id, profile.dniFront);

            if (result.error) {
                return { error: result.error }
            }

            let dniFront = result.filePath;

            profileWithDnis = {
                ...profile,
                dniFront,
                dniBack
            } as Profile;
        }

        const userWithProfile = existUserByEmail.withProfile(profileWithDnis);

        const userUpdated = await this.userService.update(userWithProfile);

        return { user: userUpdated };

    }
}
