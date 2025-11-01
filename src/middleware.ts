import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//This file manages client-side page protection and redirection
export function middleware(request: NextRequest){
    //It determines if the current route (path) is a "public" route (/login, /signup, /verifyemail).
    const path = request.nextUrl.pathname 
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    //Redirection Logic:
    //If the user has a token and is trying to access a public path (e.g., they're logged in and try to go to /login),
    //they are redirected to the home page (/).
    //If the user does NOT have a token and is trying to access a non-public path (secure route),
    //they are redirected to the /login page.

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
}

//This tells Next.js which routes this middleware function should run on
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}