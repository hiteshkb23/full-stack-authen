//
//when ever the link in the mail send for verification is clicked
//user will be redirected to this page
//Its job is to automatically read a verification token from the URL,send it to
//a backend API, and show the user whether the verification was successful or not.

"use client";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage() {
    //Stores the verification token string
    const [token, setToken] = useState("");
    //confirms the token is valid
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    //This is responsible for communicating with the backend
    //It's wrapped in useCallback to prevent it from being recreated on every render,
    //which optimizes its use in the second useEffect.
    const verifyUserEmail = useCallback(async () => {
    try {
        setLoading(true);
        //It makes an HTTP POST request to the /api/users/verifyemail endpoint,
        //sending the token from the state.If successful (try block): It sets setVerified(true)
        await axios.post('/api/users/verifyemail', { token });
        setVerified(true);
        setError(false); // Explicitly set error to false on success
    } catch (error) {
        setError(true);
        if (isAxiosError(error)) {
            // Log the specific error message from the server
            console.error("Verification failed:", error.response?.data?.error || "Axios error");
        } else {
            // Log a generic error message
            console.error("An unexpected error occurred:", error);
        }
    } finally {
        setLoading(false);
    }
    },[token]);
    
    //This effect runs one time as soon as the component loads.
    //It accesses window.location.search to get the query part of the URL
    //It splits the string by the = sign and takes the second part as the token.
    //then sets the token
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    //This effect "watches" the token state.If a token exists, it immediately calls the 
    //verifyUserEmail() function to start the verification process.
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    //contain block which shows the different message based on the component's
    //state (loading, verified, error).
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 flex items-center justify-center px-4 py-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>

            {/* Main verification card */}
            <div className="relative w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto flex items-center justify-center mb-4">
                            {loading ? (
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                            ) : verified ? (
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : error ? (
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )}
                        </div>
                        <h1 className="text-4xl font-bold text-white">
                            {loading ? "Verifying..." : verified ? "Email Verified!" : error ? "Verification Failed" : "Verify Email"}
                        </h1>
                        <p className="text-gray-300">
                            {loading ? "Please wait while we verify your email" : 
                             verified ? "Your email has been successfully verified" : 
                             error ? "There was an error verifying your email" : 
                             "Checking your verification token"}
                        </p>
                    </div>

                    {/* Token Display Section */}
                    <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6h-2.5a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 01-2.5-2.5V6.5a3 3 0 013-3 3 3 0 013 3v.5" />
                                </svg>
                                Verification Token
                            </h3>
                            
                            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                                {token ? (
                                    <div className="space-y-2">
                                        <p className="text-gray-300 text-sm">Token Status:</p>
                                        <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-400/30">
                                            <code className="text-orange-200 font-mono text-sm break-all">
                                                {token}
                                            </code>
                                        </div>
                                        <div className="flex items-center space-x-2 text-green-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs">Token found</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <p className="text-gray-400 text-sm">No verification token found</p>
                                        <p className="text-gray-500 text-xs mt-1">Please check your email for the verification link</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {verified && (
                        <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2 text-green-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-lg font-semibold">Email Successfully Verified!</span>
                                </div>
                                <p className="text-green-300 text-sm">Your account is now active and ready to use.</p>
                                <Link 
                                    href="/login"
                                    className="inline-block w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Continue to Login</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2 text-red-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <span className="text-lg font-semibold">Verification Failed</span>
                                </div>
                                <p className="text-red-300 text-sm">The verification token is invalid or has expired.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link 
                                        href="/signup"
                                        className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                                    >
                                        Try Again
                                    </Link>
                                    <Link 
                                        href="/login"
                                        className="flex-1 py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-6">
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2 text-orange-400">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
                                    <span className="text-lg font-semibold">Verifying Your Email...</span>
                                </div>
                                <p className="text-orange-300 text-sm">Please wait while we process your verification.</p>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    {!verified && !error && !loading && (
                        <div className="text-center pt-4 border-t border-white/20">
                            <p className="text-gray-400 text-sm">
                                Need help? <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Contact Support</a>
                            </p>
                        </div>
                    )}
                </div>

                {/* Additional glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-2xl blur-xl -z-10"></div>
            </div>
        </div>
    );

/*
    same as - >
    return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
    )
*/
}