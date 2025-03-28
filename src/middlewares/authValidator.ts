import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(profile?: boolean) {
    profile = profile ?? false;
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ msg: 'unauthorized' })
            return;
        }

        try {
            jwt.verify(token, process.env["JWT_SECRET"]!, (err, payload) => {
                if (err) return res.status(403).json({ error: 'Invalid Token' });

                if (!payload) return res.status(500).json({ msg: 'Something went wrong' });

                if (typeof payload === 'object' && payload !== null && 'userId' in payload) {
                    if (!profile) {
                        req.bkData.userId = payload.userId;
                    } else {
                        req.userId = payload.userId;
                    }
                }

                next();
            })

        } catch (error) {
            res.status(500).json()
        }
    }
}