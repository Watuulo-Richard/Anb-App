/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/prisma/db";
import { ListingFormData } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data:ListingFormData = await request.json()
        console.log(data , "data from my route");
        // return NextResponse.json({data})
        const createProduct = await db.product.create({
            data
        })
        return NextResponse.json({
            message: "Product Created Successfully",
            data: createProduct,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Create",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function GET(request:NextRequest){
    try {
        // const data = await request.json()
        const getAllProducts = await db.product.findMany()
        return NextResponse.json({
            message: "Success",
            data: getAllProducts,
            error: null,
            status: 500
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Create",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}