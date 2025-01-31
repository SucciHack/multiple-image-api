import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//GET SINGLE
export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    const {id} = await params
    try {
        const singleProduct = await db.product.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json({
            data:singleProduct,
            message:"fetched successfully",
            error:null
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"failed to fetch"
        })
    }
}

//UPDATE
export async function PUT(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    const {id} = await params
    const data = await request.json()
    try {
        const updatedProduct = await db.product.update({
            where:{
                id
            },
            data
        })
        return NextResponse.json({
            data:updatedProduct,
            message:"updated successfully",
            error:null
        },{
            status:201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"failed to update"
        },{
            status:500
        })
    }
}

//DELETE
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    const {id}= await params
    try {
        const existingProduct = await db.product.findFirst({
            where:{
                id
            }
        })
        if(!existingProduct){
            return NextResponse.json({
                message: "product was already deleted",
                error:null
            })
        }
        await db.product.delete({
            where:{
                id
            }
        }) 
        return NextResponse.json({
            message:"Product deleted successfully",
            error:null,
            status:200
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"failed to delete"
        },{
            status:500
        })
    }
}