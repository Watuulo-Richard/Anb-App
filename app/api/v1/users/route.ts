/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/prisma/db";
import { RegisterInputTypes } from "@/Types/types";
import  bcrypt  from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const data:RegisterInputTypes = await request.json()
        // console.log(data);
        // const hashedPassword = await bcrypt
        const {fullName, email, password, phone, profileImage} = data
        const existingUser = await db.user.findUnique({
            where : {
                email : email
            }
        })
        if(existingUser) {
            return NextResponse.json({
                data: null,
                error: "User Already Exists",
                status: 409
            }, {
                status: 409
            })
        }
        const hashedPassword = await bcrypt.hash(
            password, 10
        )
        const createUser = await db.user.create({
            data : {
                fullName, 
                email, 
                password: hashedPassword, 
                phone, 
                profileImage 
            }
        })
        const {password: returnPassword, ...others} = createUser
        return NextResponse.json({
            message: "User Created Successfully",
            data: others,
            error: null,
            status: 201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Create User Profile",
            data: null,
            error: "Something Went Wrong",
            status: 500
        }) 
    }
}

// export async function GET(request:NextRequest) {
//     try {
//         const getAllProduct = await db.user.findMany()
//         return NextResponse.json({
//             message: "Users Fetched Successfully",
//             data: getAllProduct,
//             error: null,
//             status: 200
//         })
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             message: "Failed To Fetch Users",
//             data: null,
//             error: "Something Went Wrong",
//             status: 500
//         })
//     }
// }