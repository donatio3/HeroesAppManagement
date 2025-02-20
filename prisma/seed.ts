import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma = new PrismaClient().$extends(withAccelerate())
export interface Hero {
    id: number;          // ID героя
    name: string;        // Имя героя
    description: string; // Описание героя
    element: string;     // Элемент героя (например, огонь, вода и т.д.)
}
  
  // Интерфейс для модели Filter
export interface Filter {
    id: number;        // ID фильтра
    name: string;      // Название фильтра
    label: string;     // Метка для фильтра (например, отображаемое название)
    className: string; // Класс фильтра для стилей или обработки
}


async function up() {
    const user = await prisma.heroes.create({
        data: {
            name: 'Alice',
            description: 'can do everything',
            element: 'Water',
        },
    })
    
    await prisma.heroes.create({
       data: {
        description: 'ASDas',
        name: 'Bob',
        element: 'Earth',
       }
    })
    await prisma.heroes.create({
        data: {
            name: 'Vlad',
            description: 'can write code',
            element: 'Wind',
        },
    })
    // filters
    await prisma.filters.create({
        data: {
            name: 'all',
            label: 'Все',
            className: 'btn-outline-dark',
        },
    })
    await prisma.filters.create({
        data: {
            name: 'fire',
            label: 'Огонь',
            className: 'btn-danger',
        },
    })
    await prisma.filters.create({
        data: {
            name: 'earth',
            label: 'Земля',
            className: 'btn-secondary',
        },
    })

    await prisma.filters.create({
        data: {
            name: 'water',
            label: 'Вода',
            className: 'btn-primary',
        },
    })
    await prisma.filters.create({
        data: {
            name: 'wind',
            label: 'Ветер',
            className: 'btn-success',
        },
    })
}

async function down() { // очищает данные
    // ОЧИЩЕНИЕ И ТАБЛИЦ "User" И ЕГО ЗАВИСИМОСТЕЙ ЧТОБЫ НЕ БЫЛО КОНФЛИКТОВ
   
    await prisma.$executeRaw`TRUNCATE TABLE "heroes" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "filters" RESTART IDENTITY CASCADE`;

}


async function main() { // 
    try {
        await down()
        await up()
    } catch (error) {
        console.error(error)
    }
}
    // main()
    // .then(async () => {
    //     await prisma.$disconnect()
    // })
    // .catch(async (e) => {
    //     console.error(e)
    //     await prisma.$disconnect()
    //     process.exit(1)
    // })