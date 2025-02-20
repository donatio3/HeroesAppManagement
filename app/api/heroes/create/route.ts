import { Hero, prisma } from "@/prisma/seed";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const hero = await req.json() as Hero,

    createdHero = await prisma.heroes.create({
        data:{
            name: hero.name,
            description: hero.description,
            element: hero.element   
        }
    })

    return NextResponse.json(createdHero)
}