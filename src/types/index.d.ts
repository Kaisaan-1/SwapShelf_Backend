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
                softCopy: boolean;
                userId?: string | JwtPayload;
            },
            userId: string;
            altUsrDetails: {
                age?: number;
                country?: string;
                userName?: string;
                languages?: string;
                profilePic?: string;
                description?: string;
                studentNumber?: string;
                contactNumber?: string;
                professionalTitle?: string;
            }
        }
    }
}