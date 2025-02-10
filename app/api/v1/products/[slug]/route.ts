import { db } from "@/prisma/db";
import { ListingFormData } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{slug:string}>}){
    try {
        const {slug} = await params
        const getSingleProduct = await db.product.findUnique({
            where : {
                slug : slug
            }
        })
         // Ensure amenities is formatted correctly
          
        return NextResponse.json({
            message: "Success",
            data: getSingleProduct,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Get Single Product",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function DELETE(request:NextRequest, {params}:{params:Promise<{slug:string}>}){
    try {
        const {slug} = await params
        const deleteProduct = await db.product.delete({
            where : {
                slug : slug
            }
        })
        return NextResponse.json({
            message: "Product Deleted Successfully",
            data: deleteProduct,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Get Single Product",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function PATCH(request:NextRequest, {params}:{params:Promise<{slug:string}>}){
    try {
        const {slug} = await params
        const newData:ListingFormData = await request.json()
        const updateProduct = await db.product.update({
            where : {
                slug : slug
            },
            data:newData
        })
        return NextResponse.json({
            message: "Product Updated Successfully",
            data: updateProduct,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Update Product",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}