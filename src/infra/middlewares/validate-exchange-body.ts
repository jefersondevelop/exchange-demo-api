import { NextFunction, Request, Response } from "express";
import { createExchange } from '../helpers/rules'
import validator from '../helpers/validate';

export const validateCreate = (req: Request, res: Response, next: NextFunction) => {
    validator(req.body, createExchange, res, next);
}
