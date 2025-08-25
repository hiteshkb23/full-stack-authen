// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getDatafromToken = (request: NextRequest) => {
//     try{
//         const token = request.cookies.get("token")?.value || '';
//         const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
//         return decodedToken.id;
//     }catch (error: any){
//         throw new Error(error.message);
//     }
// }


/////////////////////

import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define an interface for your decoded token's payload
interface DecodedToken extends JwtPayload {
    id: string;
    username: string;
    email: string;
}

export const getDatafromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';

        // Type the decoded token using the interface
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        
        return decodedToken.id;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while decoding token");
    }
}