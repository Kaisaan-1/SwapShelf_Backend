import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

export function altUserValidator() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.altUsrDetails = _.pick(req.body, ['age', 'country', 'userName',
                'languages', 'profilePic', 'description', 'studentNumber',
                'contactNumber', 'professionalTitle']
            )
            next();
        } catch (error) {
            res.status(500).json({ errMsg: error})
        }

    }
}