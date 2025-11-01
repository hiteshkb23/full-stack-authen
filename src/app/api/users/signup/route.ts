//
//handles user registration by creating a new user in a MongoDB database.

import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel.js";
//Imports types for handling HTTP requests and sending HTTP responses
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

//Executes the database connection function immediately when the file is run.
connect()

//function is the main logic that runs when a POST request is made to this API route
//you can and often should have multiple functions in a single route file(GET , PUT , DELETE)
//you cannot export more than one function of the same HTTP method (e.g., two different POST functions)
//from a single Next.js Route Handler file.
export async function POST(request: NextRequest) {
    try{
        //Asynchronously parses the incoming JSON data from the request body.
        const reqBody = await request.json();
        const {username ,email, password} = reqBody;

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email});
        //If a user is found, it returns an error response
        if(user){
            return NextResponse.json({error: "User already exists"},{status:400})
        }

        //Generates a salt (a random value) for password hashing. The value 10 is the cost factor, 
        //controlling the complexity and time needed for the hash.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //Creating and Saving the New User
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        console.log(savedUser);
        
        //Calls the helper function to send an email to the new user. The email is for verification 
        //and includes the unique ID (_id) of the saved user
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message:"User created successfully",
            success: true,
            savedUser
        })
    }
    // catch(error: any){
    //     return NextResponse.json({error: error.message},{status:500})
    // }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}