//
//This code defines a Next.js API route that handles an HTTP GET request. 
//Its primary purpose is to fetch the profile information of the currently logged-in user.

import {getDatafromToken} from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request:NextRequest){
    try{
        //this verifies the token and if successful then return the id
        const userId = await getDatafromToken(request);
        //find the user on the basis of userId
        const user = await User.findOne({_id:userId}).select("-password"); // this makes except password
        return NextResponse.json({
            message: "user found",
            data: user
        })
    }
    // catch(error :any){
    //     return NextResponse.json({error: error.message},{status :400});
    // }
    catch (error) {
        if (error instanceof Error) {
            // The original status was 400, which implies a client error. 
            // 500 (Internal Server Error) is often more appropriate for unexpected errors.
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}


/*
const userId = await getDatafromToken(request) <-- This is resposible for verification

In Express, you explicitly chain middleware functions for a specific route like :
->router.get('/profile', verifyJWT, profileController.getProfile)
verifyJWT is placed before profileController.getProfile. If verifyJWT fails,
it halts the request and doesn't call the profile logic.

In a Next.js Route Handler, you achieve the same result by calling the verification
function at the beginning of your handler and relying on its ability to throw an error.

*/