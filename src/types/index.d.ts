import { JwtPayload } from "jsonwebtoken";

export {}

declare global {
    namespace Express {
        export interface Request {
            bkData: {
                desc: string;
                file?: string;
                genre: string;
                title: string;
                author: string;
                coverArt?: string;
                softCopy: boolean;
                userId?: string | JwtPayload;
            }
        }
    }
}