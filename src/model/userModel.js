//
//This code defines a Mongoose schema for a User model, which is used to interact with a MongoDB database

import mongoose from "mongoose";

//it creates a new Mongoose schema named userSchema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"please provide a password",]
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,    
})

//this creates a Mongoose model based on the userSchema
//This model, typically named User, provides the interface for querying, creating, updating,
//and deleting documents in the MongoDB collection named "users".
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;


/*

Next.js/Serverless Environment Handling:

mongoose.models.users || mongoose.model("users", userSchema) is a common pattern in 
Next.js (or any serverless environment) to prevent model re-compilation.

The code first checks if a model named users already exists (mongoose.models.users). 
If it exists (meaning it was compiled during a previous function call in a serverless environment),
it uses the existing one.

If it doesn't exist, it creates a new model using mongoose.model("users", userSchema).

*/