import { NextFunction, Request, Response } from "express";
import { loginRule, recoverRule, registerRule, validatePass } from '../helpers/rules'
import validator from '../helpers/validate';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, registerRule, res, next);
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, loginRule, res, next);
}

export const validateRecover = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, recoverRule, res, next);
}

export const validateValidatePass = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, validatePass, res, next);
}