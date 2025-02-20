import { prisma } from "@/prisma/seed";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const heroes = await prisma.heroes.findMany({
            orderBy: {id: 'asc'}
        })
        return NextResponse.json(heroes)

    } catch (error) {
        return NextResponse.json(error)        
    }
}