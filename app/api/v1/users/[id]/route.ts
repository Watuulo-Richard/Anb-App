import { db } from "@/prisma/db";
import { RegisterInputTypes } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function  GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const getSingleUser = await db.user.findUnique({
            where : {
                id : id
            }
        })
        return NextResponse.json({
            message: "User Deleted Successfully",
            data: getSingleUser,
            error: null,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "User Deleted Successfully",
            data: null,
            error: "Something Went Wrong",
        })
    }
}


export async function  PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const newData:RegisterInputTypes = await request.json()
        const {id} = await params
        const getSingleUser = await db.user.update({
            where : {
                id : id
            },
            data:newData
        })
        return NextResponse.json({
            message: "User Deleted Successfully",
            data: getSingleUser,
            error: null,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "User Deleted Successfully",
            data: null,
            error: "Something Went Wrong",
        })
    }
}