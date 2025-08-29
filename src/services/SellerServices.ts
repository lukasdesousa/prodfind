import { PrismaClient } from "../generated/prisma/index.js";
import validator from 'validator';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class SellerServices {
    async createSeller(data: { storeName: string; email: string; password: string; location: string; }): Promise<any> {
        if(!data.storeName || !data.email || data.password) throw new Error('No data provided');
        if(!validator.isEmail(data.email)) throw new Error('Invalid email format');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await prisma.seller.create({
            data: {
                storeName: data.storeName,
                email: data.email,
                password: hashedPassword,
                location: data.location,
            }
        })

        return { message: 'Seller account created successfully.'};
    }
}