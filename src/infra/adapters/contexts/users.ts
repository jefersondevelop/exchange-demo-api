import { ChangePassword } from '../../../domain/user/usecases/change_pass';
import { GetProfileUser } from '../../../domain/user/usecases/get_profile'
import { UpdateUserProfile } from '../../../domain/user/usecases/update_user';
import { UpdateProfileImage } from '../../../domain/user/usecases/update_user_image';
import { UserController } from "../../controllers/user_controller";
import { BasicFileService } from '../files/basic_file_service';
import { BasicUserService } from '../user/basic_user_service';
import { BcryptPasswordService } from '../user/bcrypt_password_service';
import { MongoUserRepository } from '../user/mongo_user_repository';
import { GetAllUsers } from '../../../domain/user/usecases/get_all';

const userRepo = new MongoUserRepository();
const fileService = new BasicFileService();
const passwordService = new BcryptPasswordService();

const service = new BasicUserService(userRepo);
const getProfile = new GetProfileUser(service);
const getAllUsers = new GetAllUsers(service);
const updateProfile = new UpdateUserProfile(service, fileService);
const updateProfileImage = new UpdateProfileImage(service, fileService)
const changePassword = new ChangePassword(service, passwordService)
const controller = new UserController(getProfile, updateProfile, updateProfileImage, changePassword, getAllUsers);

export default controller;