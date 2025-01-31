import { productInputProps } from "@/components/product-form";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//POST
export async function POST(request:NextRequest) {
    const data:productInputProps = await request.json()
    try {
        const newProduct = await db.product.create({
            data
        })
        return NextResponse.json({
            data:newProduct,
            message:"fetched",
            error:null
        },{
            status:201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"something went wrong"
        })
    }
}

// GET

export async function GET() {
    try {
        const data = await db.product.findMany()
    return NextResponse.json({
        data,
        message:"fetched",
        error:null
    },{
        status:200
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"something went wrong"
        },{
            status:500
        })
    }
}