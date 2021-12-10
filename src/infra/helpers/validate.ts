import { NextFunction, Request, Response } from "express";
import Validator from 'validatorjs';

const validator = (body: Request, rules: any, customMessages: any, callback: Function) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

let validate = (body: any, rules: any, res: Response, next: NextFunction) => {
    validator(body, rules, {}, (err: Error, status: any) => {
        if (!status) {
            res.status(422)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

export default validate;