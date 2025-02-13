import { PayloadTypes } from "@/Types/types";
import { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

// Encoding The Secret Key

const secretKey = process.env.SESSION_KEY
const encodedKey = new TextEncoder().encode(secretKey)
export async function encrypt(payload:PayloadTypes) {
    return new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey)
}

// Create Dcrypt Function
export async function dcrypt(session:string | undefined = ''){
    try {
       const{ payload }= await jwtVerify(session, encodedKey, {algorithms:["HS256"]})
       return payload
    } catch (error) {
        console.log(error);
    }
}

// Creating Session
export async function createSession(existingUser:User) {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    const payload = {
        userId: existingUser.id,
        name: existingUser.fullName,
        email: existingUser.email,
        phone: existingUser.phone,
        image: existingUser.profileImage,
        expiresAt: expiresAt
    }
    const session = await encrypt(payload)
    const cookieStore = await cookies()
    cookieStore.set("session", session,{
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax"
    })
}

// Updating Session
export async function updateSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    const payload = await dcrypt(session)
    if(!session || !payload) {
        return null
    }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}