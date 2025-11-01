//
//This code exports an asynchronous function sendEmail that is designed 
//to send either a password reset or email verification link to a user.
//This imports the Nodemailer library, which is a popular Node.js module for sending emails.
import nodemailer from 'nodemailer';
//This imports the Mongoose model for your User which allows you to interact with your 
// MongoDB users collection
import User from "@/model/userModel";
import bcryptjs from 'bcryptjs';

// 1. Define an interface for the function parameters
interface SendEmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async({email, emailType , userId}: SendEmailParams) => {
    try{
        // Create a hashed token based on the user's ID
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the user document based on the email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,  //?
                verifyTokenExpiry: Date.now() + 3600000 // Expires in 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // Expires in 1 hour
            });
        }

        // Configure the email transporter using Mailtrap credentials
        //Mailtrap?
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3022d97b56854a",
                pass:"47ecb8fd29ac76",
            }
        });

        //Define the Email Content
        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            //This is the body of the email. It constructs a link:
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
            //The hashedToken is added as a URL query parameter.
        };

        //Send the Email
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        //If successful, it returns information about the sent email.

    } catch (error) { // 2. Corrected catch block
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while sending email.");
    }
}

/*
to send the token in the url we have two ways to do it
1. domain.com/veirfytoken/asdfghjkl
we can extract the token using params
//better for server component

2.domain.com/verifytoken?token=asdfghjkl
we can extract the token using window.location.search
//better for client component


//why storing the token in the database
Here When the user clicks the link in their email, your application will get the token from the URL.
It will then search the database for a user with that exact token and check that the token hasn't expired.
This is how it verifies the request is valid and belongs to that specific user.


//
Mailtrap is a development tool used to test email sending. It "traps" the email in a virtual inbox so you
can see how it looks without spamming real email addresses.
*/