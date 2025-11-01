//This imports the NextResponse object from the next/server module.
import { NextResponse } from "next/server";
//logging out the user

//This function is designed to run on the server when a client click on logout
//that is makes a GET request to the file's URL (e.g., /api/logout).
export async function GET(){
    try{
        //This line creates a new response object that will be sent back to the client.
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        //It modifies the response object to add a Set-Cookie header, which instructs the user's
        //browser to change a cookie named token to a empty string
        response.cookies.set("token","",
        {httpOnly: true, expires: new Date(0)});  
        return response;
        //expires: new Date(0): This is the trick to delete a cookie.
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

/*
Setting the expires attribute to a date in the past (like new Date(0), which is January 1, 1970)
is the standard and official way to instruct a browser to delete a cookie 
and 
Setting the token value to "" does not delete the cookie ,it overwrites the cookie's value as a result
authentication middleware will get token="", see that it's not a valid token, and deny access.
both are used , null string act as backup
*/