// app/api/heroes/[id]/route.ts
import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    id: number;
}

type Context = {
    params: Params;
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        // Удаляем героя по ID
        const hero = await prisma.heroes.delete({
            where: {
                id // Преобразуем строку в число    
            },
        });

        return NextResponse.json(hero, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
    }  
}
