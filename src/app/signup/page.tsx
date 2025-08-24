"use client";
import Link from "next/link";
import React ,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({

        email:"",
        username:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("signup success", response.data);
            router.push("/login");

        }catch(error:any){
            console.log("signup failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ?"Processing" : "signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                id="username"
                type="text" 
                value={user.username}
                onChange={(e) => setUser({...user,username:e.target.value})}
                placeholder="username"
                className="p-2 border border-gray-300 rounded-lg mb-4
                focus:outline-none focus:border-gray-600"
            />
            
            <label htmlFor="email">email</label>
            <input 
                id="email"
                type="text" 
                value={user.email}
                onChange={(e) => setUser({...user,email:e.target.value})}
                placeholder="email"
                className="p-2 border border-gray-300 rounded-lg mb-4
                focus:outline-none focus:border-gray-600"
            />

            <label htmlFor="password">password</label>
            <input 
                id="password"
                type="password" 
                value={user.password}
                onChange={(e) => setUser({...user,password:e.target.value})}
                placeholder="password"
                className="p-2 border border-gray-300 rounded-lg mb-4
                focus:outline-none focus:border-gray-600 "
            />

            <button 
                className="p-2 border border-gray-300 rounded-lg mb-4
                focus:outline-none focus:border-gray-600"
                onClick={onSignup}>
                {buttonDisabled ? "No signup" : "signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}