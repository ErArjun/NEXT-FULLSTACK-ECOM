import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(req:NextRequest){
    if((await isAuthenticated(req))===false){
        return new NextResponse("Unauthorized",{
            status:401,
            headers:{"WWW-Authenticate":"Basic"}
        })
    
    }
}

async function isAuthenticated(req:NextRequest){
    const authHeaders=req.headers.get("authorization") || req.headers.get("Authorization")
    if(authHeaders==null) return false


    //authHeader format=basic asdfdsbn;flksandf  (second part is username password in encypted form) so [1] 
    //authHeader is encyrpted so buffer base64 is used 
    //after decrypted authHeader is username:password so split(:)

    const [username, password]=Buffer.from(authHeaders.split(" ")[1],"base64").toString().split(":")
    return username===process.env.ADMIN_USERNAME && (await isValidPassword(password,process.env.HASHED_ADMIN_PASSWORD as string))
}

export const config = {
    matcher:"/admin/:path*"
}