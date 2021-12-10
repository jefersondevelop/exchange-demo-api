import express from "express";
import { validateUpdateProfile } from "../../middlewares/validate-profile-body";
import verifyUserLogged, { verifyAdminRole } from "../../middlewares/verify-auth";
import users from '../contexts/users'
const app = express.Router();

app.get('/profile', verifyUserLogged, (req: any, res: any) => { users.getProfile(req, res) });
app.get('/', [verifyUserLogged, verifyAdminRole], (req: any, res: any) => { users.getAll(req, res) });
app.put('/profile', [verifyUserLogged, validateUpdateProfile], (req: any, res: any) => { users.updateProfile(req, res) })
app.put('/profile/selfie', [verifyUserLogged], (req: any, res: any) => { users.updateProfileSelfie(req, res) })

export default app; 