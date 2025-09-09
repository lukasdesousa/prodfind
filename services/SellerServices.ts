import { PrismaClient } from "@prisma/client";
import validator from 'validator';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class SellerServices {
    async createSeller(data: { name: string; email: string; password: string; }): Promise<any> {
        if(!data.name || !data.email || data.password) throw new Error('No data provided');
        if(!validator.isEmail(data.email)) throw new Error('Invalid email format');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await prisma.seller.create({
            data: {
                storeName: data.name,
                email: data.email,
                password: hashedPassword,
            }
        })

        return { message: 'Seller account created successfully.'};
    }
}