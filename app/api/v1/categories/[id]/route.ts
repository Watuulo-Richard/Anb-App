import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const getSingleCategory = await db.category.findUnique({
            where : {
                id : id
            },
            include: {
                products:true
            }
        })
        return NextResponse.json({
            message: "Fetched Single Category",
            data: getSingleCategory,
            error: null,
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Fetched Single Category",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const deleteCategory = await db.category.delete({
            where: {
                id : id
            }
        })
        return NextResponse.json({
            message : "Category Deleted Successfully",
            data : deleteCategory,
            error : null,
            status : 200,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Delete Category",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}

export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const newData = await request.json()
        const {id} = await params
        const updateCategory  = await db.category.update({
            where : {
                id : id
            },
            data:newData
        })
        return NextResponse.json({
            message : "Category Updated Successfully",
            data : updateCategory,
            error : null,
            status : 200,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed To Update Category",
            data: null,
            error: "Something Went Wrong",
            status: 500
        })
    }
}