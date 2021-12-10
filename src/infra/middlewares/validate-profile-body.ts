import { Request, Response, NextFunction } from "express";
import { validateProfileUpdate } from "../helpers/rules";
import validator from '../helpers/validate'

export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, validateProfileUpdate, res, next);
}