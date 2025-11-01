/*
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDatafromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        return decodedToken.id;
    }catch (error: any){
        throw new Error(error.message);
    }
}
*/


/////////////////////
//This function acts as your custom JWT verification middleware for server-side code
//For verification you have call this function in the begining of every secure route component

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
        //It takes the incoming NextRequest object.
        //It attempts to extract the JWT (JSON Web Token) from the request's cookies,
        //specifically looking for a cookie named 'token'.
        const token = request.cookies.get("token")?.value || '';

        //It uses the jsonwebtoken library and your secret key (process.env.TOKEN_SECRET!)
        //to verify and decode the token.
        //It casts the decoded payload to your DecodedToken interface to ensure type safety.
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        
        //It returns the user's ID (decodedToken.id) on successful verification.
        return decodedToken.id;
    } 
    //f the cookie is missing, the token is invalid, or verification fails, it throws an error.
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while decoding token");
    }
}