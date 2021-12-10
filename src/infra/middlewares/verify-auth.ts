import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from '../../domain/user/models/user';

export interface RequestWithUser extends Request {
    user?: User;
    files?: any;
}

export default async function verifyUserLogged(req: RequestWithUser, res: Response, next: NextFunction) {

    if (!req.headers.authorization) {
        return res.status(401).json({
            ok: false,
            message: "No se ha encontrado header de autorización"
        });
    }

    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, 'mysecretjwt', (error: any, data: any) => {
        if (error) {
            if (error.name == 'TokenExpiredError')
                return res.status(401).json({
                    code: 'A01',
                    message: "Su sesión ha expirado"
                });
            else
                return res.status(401).json({
                    code: 'A02',
                    message: "Ha ocurrido un error",
                    error: 'Token no válido'
                });
        }
        req.user = data;
        next();
    });

}

export async function verifyAdminRole(req: RequestWithUser, res: Response, next: NextFunction) {
    let { user }: any = req;

    if (!user || user.role !== 'ADMIN') {
        return res.status(401).json({
            message: 'Unauthorized user.'
        })
    }

    next();

}