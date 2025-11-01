//
//This is a Next.js API route specifically designed to handle a user login request.
//It uses JWT (JSON Web Tokens) for authentication

import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

//This ensures that a connection to your database is established before any requests are handled.
connect()

//this automatically creates an API endpoint that listens for HTTP POST requests at the
//file's route (e.g., /api/users/login).
export async function POST(request: NextRequest) {
    try{
        //parses the request and destructures the email and password
        const reqBody = await request.json()
        const {email,password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"},{status:400})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status: 400})
        }

        //create token data(payload)
        const tokenData = {
            id:user._id,
            username: user.username,
            email: user.email
        }

        //creating the token
        const token = await jwt.sign(tokenData, process.
        env.TOKEN_SECRET! ,{expiresIn: "1d"})

        //It creates a successful JSON response to send back to the client.
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        //it attaches the new token to this response as a cookie.
        //httpOnly:It means the cookie cannot be accessed by JavaScript running
        //in the browser, which helps protect it from XSS (Cross-Site Scripting) attacks.
        response.cookies.set("token",token,{
            httpOnly:true, 
        })
        return response;
    }
    // catch(error:any){
    //     return NextResponse.json({error: error.message},{status:500})
    // }
    catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
}
}

/*

*/
