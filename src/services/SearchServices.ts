import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SearchServices {
    async searchProducts(data: { name: string; location?: string; }): Promise<any> {
        if (!data.name || !data.location) throw new Error('No data provided');

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: data.name,
                    mode: 'insensitive',
                },
                seller: {
                    location: {
                        contains: data.location,
                        mode: 'insensitive',
                    }
                }
            },
            include: {
                seller: {
                    select: {
                        location: true,
                        storeName: true,
                    }
                },
            }
        })

        return { message: 'We found these products', products };
    }
}