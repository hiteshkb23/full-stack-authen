// "use client";
// // import axios from "axios";
// import axios, { isAxiosError } from "axios";
// import Link from "next/link";
// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function UserProfile() {
//     const router = useRouter();
//     const [data, setData] = useState("nothing");
//     const [userData, setUserData] = useState<any>(null); // Store full user data
//     const [loading, setLoading] = useState(false);
//     const [userDetailsLoading, setUserDetailsLoading] = useState(false);

//     // const logout = async () => {
//     //     try {
//     //         setLoading(true);
//     //         await axios.get('/api/users/logout');
//     //         toast.success('Logout successful');
//     //         router.push('/login');
//     //     } catch (error: any) {
//     //         console.log(error.message);
//     //         toast.error(error.message);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // const getUserDetails = async () => {
//     //     try {
//     //         setUserDetailsLoading(true);
//     //         const res = await axios.get('/api/users/me');
//     //         console.log(res.data);
//     //         setUserData(res.data.data); // Store full user object
//     //         setData(res.data.data._id); // Keep existing functionality
//     //         toast.success('User details loaded successfully');
//     //     } catch (error: any) {
//     //         console.log(error.message);
//     //         toast.error(error.message);
//     //     } finally {
//     //         setUserDetailsLoading(false);
//     //     }
//     // };

//     /////////////////
//     const logout = async () => {
//     try {
//         setLoading(true);
//         await axios.get('/api/users/logout');
//         toast.success('Logout successful');
//         router.push('/login');
//     } catch (error) { // Corrected catch block
//         if (isAxiosError(error)) {
//             toast.error(error.response?.data?.error || "Logout failed");
//         } else if (error instanceof Error) {
//             toast.error(error.message);
//         } else {
//             toast.error("An unexpected error occurred");
//         }
//     } finally {
//         setLoading(false);
//     }
// };

// const getUserDetails = async () => {
//     try {
//         setUserDetailsLoading(true);
//         const res = await axios.get('/api/users/me');
//         console.log(res.data);
//         setUserData(res.data.data); 
//         setData(res.data.data._id); 
//         toast.success('User details loaded successfully');
//     } catch (error) { // Corrected catch block
//         if (isAxiosError(error)) {
//             toast.error(error.response?.data?.error || "Failed to get details");
//         } else if (error instanceof Error) {
//             toast.error(error.message);
//         } else {
//             toast.error("An unexpected error occurred");
//         }
//     } finally {
//         setUserDetailsLoading(false);
//     }
// };
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center px-4 py-8">
//             {/* Background decoration */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//                 <div className="absolute top-40 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//             </div>

//             {/* Main profile card */}
//             <div className="relative w-full max-w-lg">
//                 <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
//                     {/* Header */}
//                     <div className="text-center space-y-2">
//                         <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center mb-4">
//                             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                             </svg>
//                         </div>
//                         <h1 className="text-4xl font-bold text-white">
//                             {userData?.username ? `Welcome, ${userData.username}!` : 'Profile'}
//                         </h1>
//                         <p className="text-gray-300">Welcome to your dashboard</p>
//                     </div>

//                     {/* User Details Section */}
//                     <div className="space-y-4">
//                         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 User Information
//                             </h3>
                            
//                             <div className="bg-white/10 rounded-lg p-4 border border-white/20">
//                                 {!userData ? (
//                                     <div className="text-center py-4">
//                                         <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                                         </svg>
//                                         <p className="text-gray-400 text-sm">No user details loaded</p>
//                                         <p className="text-gray-500 text-xs mt-1">Click "Get User Details" to load your information</p>
//                                     </div>
//                                 ) : (
//                                     <div className="space-y-4">
//                                         {/* Username */}
//                                         <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                                             <div className="flex items-center space-x-3">
//                                                 <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                 </svg>
//                                                 <span className="text-gray-300 text-sm">Username:</span>
//                                             </div>
//                                             <span className="text-white font-semibold">{userData.username}</span>
//                                         </div>

//                                         {/* Email */}
//                                         <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                                             <div className="flex items-center space-x-3">
//                                                 <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                                                 </svg>
//                                                 <span className="text-gray-300 text-sm">Email:</span>
//                                             </div>
//                                             <span className="text-white font-semibold">{userData.email}</span>
//                                         </div>

//                                         {/* User ID */}
//                                         <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                                             <div className="flex items-center space-x-3">
//                                                 <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                                                 </svg>
//                                                 <span className="text-gray-300 text-sm">User ID:</span>
//                                             </div>
//                                             <Link 
//                                                 href={`/profile/${userData._id}`}
//                                                 className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300 hover:underline text-sm"
//                                             >
//                                                 {userData._id}
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="space-y-4">
//                         {/* Get User Details Button */}
//                         <button
//                             onClick={getUserDetails}
//                             disabled={userDetailsLoading}
//                             className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
//                                 userDetailsLoading
//                                     ? "bg-gray-600 cursor-not-allowed opacity-50"
//                                     : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:scale-105 shadow-lg hover:shadow-xl"
//                             }`}
//                         >
//                             {userDetailsLoading ? (
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                     <span>Loading Details...</span>
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                     </svg>
//                                     <span>Get User Details</span>
//                                 </div>
//                             )}
//                         </button>

//                         {/* Logout Button */}
//                         <button
//                             onClick={logout}
//                             disabled={loading}
//                             className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
//                                 loading
//                                     ? "bg-gray-600 cursor-not-allowed opacity-50"
//                                     : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl"
//                             }`}
//                         >
//                             {loading ? (
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                     <span>Logging Out...</span>
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                     </svg>
//                                     <span>Logout</span>
//                                 </div>
//                             )}
//                         </button>
//                     </div>

//                     {/* Additional Info */}
//                     <div className="text-center pt-4 border-t border-white/20">
//                         <p className="text-gray-400 text-sm">
//                             Need help? <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Contact Support</a>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Additional glow effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-2xl blur-xl -z-10"></div>
//             </div>
//         </div>
//     );
// }


/////////////////////

"use client";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// ✅ FIX 2: Define a specific type for the user data instead of 'any'
interface User {
  _id: string;
  username: string;
  email: string;
}

export default function UserProfile() {
    const router = useRouter();
    // ✅ FIX 1: Removed the unused 'data' state. 'userData' holds all the needed info.
    const [userData, setUserData] = useState<User | null>(null); // Use the new User type
    const [loading, setLoading] = useState(false);
    const [userDetailsLoading, setUserDetailsLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Logout failed");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            setUserDetailsLoading(true);
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setUserData(res.data.data);
            toast.success('User details loaded successfully');
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Failed to get details");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setUserDetailsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center px-4 py-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>

            {/* Main profile card */}
            <div className="relative w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-white">
                            {userData?.username ? `Welcome, ${userData.username}!` : 'Profile'}
                        </h1>
                        <p className="text-gray-300">Welcome to your dashboard</p>
                    </div>

                    {/* User Details Section */}
                    <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                User Information
                            </h3>
                            
                            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                                {!userData ? (
                                    <div className="text-center py-4">
                                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="text-gray-400 text-sm">No user details loaded</p>
                                        {/* ✅ FIX 3: Escaped the double quotes */}
                                        <p className="text-gray-500 text-xs mt-1">Click &quot;Get User Details&quot; to load your information</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Username */}
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="text-gray-300 text-sm">Username:</span>
                                            </div>
                                            <span className="text-white font-semibold">{userData.username}</span>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                                <span className="text-gray-300 text-sm">Email:</span>
                                            </div>
                                            <span className="text-white font-semibold">{userData.email}</span>
                                        </div>

                                        {/* User ID */}
                                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                <span className="text-gray-300 text-sm">User ID:</span>
                                            </div>
                                            <Link 
                                                href={`/profile/${userData._id}`}
                                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300 hover:underline text-sm"
                                            >
                                                {userData._id}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        {/* Get User Details Button */}
                        <button
                            onClick={getUserDetails}
                            disabled={userDetailsLoading}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                                userDetailsLoading
                                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:scale-105 shadow-lg hover:shadow-xl"
                            }`}
                        >
                            {userDetailsLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Loading Details...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Get User Details</span>
                                </div>
                            )}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                                loading
                                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                                    : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Logging Out...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center pt-4 border-t border-white/20">
                        <p className="text-gray-400 text-sm">
                            Need help? <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Contact Support</a>
                        </p>
                    </div>
                </div>

                {/* Additional glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-2xl blur-xl -z-10"></div>
            </div>
        </div>
    );
}