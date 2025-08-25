// import nodemailer from 'nodemailer';
// import User from "@/model/userModel";
// import bcryptjs from 'bcryptjs';

// export const sendEmail = async({email, emailType , userId}:any) => {
//     try{
//         const hashedToken = await bcryptjs.hash(userId.toString(),10)

//         if(emailType === "VERIFY"){
//             await User.findByIdAndUpdate(userId,
//             {verifyToken: hashedToken, verifyTokenExpiry:
//             Date.now() + 3600000})
//         }
//         else if(emailType === "RESET"){
//             await User.findByIdAndUpdate(userId,{
//             forgotPasswordToken: hashedToken,
//             forgotPasswordTokenExpiry: Date.now() + 3600000})
//         }

//         // Looking to send emails in production? Check out our Email API/SMTP product!
//         var transport = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "3022d97b56854a",
//             pass: "47ecb8fd29ac76",
//         }
//         });

//         const mailOptions = {
//             from: 'hitesh@gmail.com',
//             to: email,
//             subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
//             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
//             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//             </p>`
//         }

//         const mailresponse = await transport.sendMail(mailOptions);
//         return mailresponse;
//     } 
//     catch (error:any){
//         throw new Error(error.message);
//     }
// }

//////////////////////////

import nodemailer from 'nodemailer';
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
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000 // Expires in 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // Expires in 1 hour
            });
        }

        // Configure the email transporter using Mailtrap credentials
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3022d97b56854a",
                pass:"47ecb8fd29ac76",
            }
        });

        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) { // 2. Corrected catch block
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while sending email.");
    }
}