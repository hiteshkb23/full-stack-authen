//
//This code is a Next.js API route (specifically for the App Router) designed to handle the 
//final step of an email verification process.

//Its main job is to receive a verification token from a client, find a user with that token in
//the database, verify them, and then clear the token so it can't be used again.
import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

connect()

//This handles any POST HTTP requests sent to this route's URL (e.g., /api/verifyemail).
export async function POST(request: NextRequest){ 
    try {
        //reads the body and expects the JSON body to have a token property
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        //it search the user on the basis of two condition
        //token must match and tokenexpirty must be in future
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        //if no user found
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isVerified = true;
        //These lines clear the token from the user's document. This is a critical security
        //step to ensure the token is one-time-use.
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
    } 
    // catch (error:any) {
    //     return NextResponse.json({error: error.message}, {status: 500})
    // }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

/*
How the mail system is working =>

1.user signup using a email ,username, password

2.In the signup route , we stroe the email, username, password and send a email using nodemailer
This mail is created using a function defined in the mailer.ts helper file

3.In the sendmail function, we create a token , save in the database and create a link using this 
token and send the mail containing the link

4.User gets the mail , and when click on the link it is redirected to a new a page

5.This page is verifyemail/page.tsx , Here it grabs the token from the url and send it to 
this route for verifying the token and  verifying  the email(then this post function runs)
, upon successfull verification of the email , the page shows that the email is verified
*/