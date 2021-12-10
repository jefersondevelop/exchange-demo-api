import { FileService } from "../../files/ports/file_service";
import { User } from "../models/user";
import { Profile } from "../models/userProfile";
import { UserService } from "../ports/user_service";

export class UpdateProfileImage {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService
    ) {
    }

    public async call(
        email: string | undefined,
        type: string | undefined,
        id: string | undefined,
        file: any | undefined
    ): Promise<{ user?: User, error?: any }> {
        const existUserByEmail = await this.userService.findUserByEmail(email);

        if (!existUserByEmail) {
            return { error: { code: 'UDI_03', message: 'User does not Exists.', httpCode: 404 } };
        }

        if (existUserByEmail.profile?.selfie) {
            await this.fileService.deleteFile('users', existUserByEmail.profile.selfie);
        }

        const { filePath, error } = await this.fileService.uploadFile(type, id, file);

        if (error) {
            return { error: error };
        }

        const profile = existUserByEmail.withOnlyProfile();

        let newProfile = {
            ...profile,
            selfie: filePath
        } as Profile;

        const user = await this.userService.update(existUserByEmail.withProfile(newProfile));

        return { user };

    }
}
