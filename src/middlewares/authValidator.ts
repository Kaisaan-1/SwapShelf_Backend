import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export function authenticateToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({msg: 'unauthorized'})

        jwt.verify(token, process.env["JWT_SECRET"]!, (err, payload) => {
            if (err) return res.status(403);

            if (!payload) return res.status(400).json({msg: 'Something went wrong'});

            req.bkData.userId = payload;

            next();
        })
    }
}