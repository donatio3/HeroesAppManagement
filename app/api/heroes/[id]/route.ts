// app/api/heroes/[id]/route.ts
import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    id: number;
}

type Context = {
    params: Params;
};

export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }> }) {
    try {

    const id = Number((await params).id)

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const heroItem = await prisma.heroes.findFirst({
        where: {
            id
        },
    })


    if (!heroItem) {
        return NextResponse.json({error: 'Cart item not found'}, {status: 404})
    }

    await prisma.heroes.delete({
        where: {
            id
        }
    })

        return NextResponse.json(heroItem, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
    }  
}
