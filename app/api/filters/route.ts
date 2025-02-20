import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const filters = await prisma.filters.findMany({
            orderBy: {id: 'asc'}
        })
        console.log(('filters ',filters));
        
        return NextResponse.json(filters)
    } catch (error) {
        console.log('error FILTERS FETCH', error);
        return NextResponse.json(error)
    }
}