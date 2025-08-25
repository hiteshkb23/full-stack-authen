import { NextResponse } from "next/server";


export async function GET(){
    try{
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        response.cookies.set("token","",
        {httpOnly: true, expires: new Date(0)});
        return response;
    }
    // catch(error:any){
    //     return NextResponse.json({error: error.message},{status:500});
    // }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred during logout" }, { status: 500 });
    }
}