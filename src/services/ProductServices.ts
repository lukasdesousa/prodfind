import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export class ProductServices {
    async createProduct(data: {sellerId: string, name: string, description: string, stock: number; keys: string[]; price: number}): Promise<any> {

        if(!data.sellerId || !data.name || !data.description || !data.price) throw new Error('No data provided');

        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                seller: { connect: { id: data.sellerId } },
                description: data.description,
                keys: data.keys,
            }
        })

        return { message: 'Product created successfully', newProduct};
    }
}