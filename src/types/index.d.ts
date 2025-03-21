export {}

declare global {
    namespace Express {
        export interface Request {
            bkData: {
                file: string;
                desc: string;
                genre: string;
                title: string;
                author: string;
                coverArt: string;
                hardOrSoft: boolean;
            }
        }
    }
}