/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSession } from "@/lib/session";
import { db } from "@/prisma/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data = await request.json()
        const {email, password} = data
        // console.log(data, "Jackal");
        // return NextResponse.json({data})
        const existingUser = await db.user.findUnique({
            where : {
                email : email
            }
        })
        if(!existingUser){
            return NextResponse.json({
                data: null,
                message: "Wrong Credentials",
                status: 403
            })
    
        }
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password)
        if(!isCorrectPassword){
            return NextResponse.json({
                data: null,
                message: "Wrong Credentials",
                status: 403
            })
        }
        await createSession(existingUser)
        const { password: removePassword, ...others} = existingUser
        return NextResponse.json({
            data: others,
            message: "Login Successful",
            error: null,
            status: 201
        }, {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: "Something Went Wrong",
            status: 500
        }, {
            status: 500
        })     
    }   
}

