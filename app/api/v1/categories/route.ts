/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/prisma/db";
import { CategoryType } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data:CategoryType = await request.json()
        const createCategory = await db.category.create({
            data
        })
        return NextResponse.json({
            message: "Category Created Successfully",
            data: createCategory,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Create Category",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function GET(request:NextRequest) {
    try {
        const getAllCategories = await db.category.findMany({
            include: {
                products:true
            }
        })
        return NextResponse.json({
            message: "Fetched All Categories",
            data: getAllCategories,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Fetched All Categories",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}