import {getDatafromToken} from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request:NextRequest){
    try{
        const userId = await getDatafromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
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