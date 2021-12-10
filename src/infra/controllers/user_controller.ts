import { Response } from "express";
import { Profile } from "../../domain/user/models/userProfile";
import { GetProfileUser } from "../../domain/user/usecases/get_profile";
import { UpdateUserProfile } from "../../domain/user/usecases/update_user";
import { ChangePassword } from "../../domain/user/usecases/change_pass";
import { UpdateProfileImage } from "../../domain/user/usecases/update_user_image";
import { RequestWithUser } from "../middlewares/verify-auth";
import { GetAllUsers } from "../../domain/user/usecases/get_all";

export class UserController {

    constructor(
        private readonly getUserProfile: GetProfileUser,
        private readonly updateUserProfile: UpdateUserProfile,
        private readonly updateProfileImage: UpdateProfileImage,
        private readonly changePassword: ChangePassword,
        private readonly getAllUsers: GetAllUsers
    ) {
    }

    public async getProfile(req: RequestWithUser, res: Response) {
        try {
            const email: string | undefined = req.user?.email
            const { user, error } = await this.getUserProfile.call(email);

            if (error) {
                throw error;
            }

            return res.json({ data: user });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

    public async updateProfile(req: RequestWithUser, res: Response) {
        try {
            const email: string | undefined = req.user?.email

            // If user is changing his password.
            if (req.body.password) {
                let { errorPassword } = await this.changePassword.call(email, req.body.password, req.body.newPassword)
                if (errorPassword) {
                    return res.status(errorPassword.httpCode).json({ message: errorPassword.message });
                }
            }

            // If dni documents were uploaded
            if (req.files) {
                let { dniFront, dniBack } = req.files
                req.body.dniBack = dniBack
                req.body.dniFront = dniFront
            }

            // If user is changing data of profile
            const profile: Profile = req.body;

            let { error } = await this.updateUserProfile.call(email, profile);
            const { user } = await this.getUserProfile.call(email);

            if (error) {
                return res.status(error.httpCode).json({ message: error.message });
            }

            return res.json({ data: user, message: 'User profile modified successfully.' });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

    public async updateProfileSelfie(req: any, res: Response) {
        try {
            const email: string | undefined = req.user?.email

            if (!req.files) {
                return {
                    error: {
                        "success": false,
                        "message": "Validation failed",
                        "data": {
                            "errors": {
                                "selfie": [
                                    "The selfie field is required."
                                ]
                            }
                        }
                    }
                };
            }

            const selfie: any = req.files.selfie;

            const { user, error } = await this.updateProfileImage.call(email, 'users', req.user?.uid, selfie)


            if (error) {
                return res.status(error.httpCode).json({ message: error.message });
            }

            return res.json({ data: user, message: 'User profile modified successfully.' });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json(e.message ? e.message : 'Ups something wrong happened try again later')
        }
    }

    public async getAll(req: RequestWithUser, res: Response) {
        try {

            const { users, error } = await this.getAllUsers.call();

            if (error) {
                throw error;
            }

            return res.json({ data: users });
        } catch (e) {
            console.error("AuthController::handleLogin", e)
            return res.status(500).json("Ups something wrong happened try again later")
        }
    }

}
