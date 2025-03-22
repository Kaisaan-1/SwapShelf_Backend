import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

export function bookValidator() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.bkData = _.pick(req.body, ['softCopy', 'file', 'coverArt', 'author', 'title', 'genre', 'desc']);
            next();
        } catch (error) {
            res.status(400).json({msg: 'Fill out all fields'})
        }
    }
}