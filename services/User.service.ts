import { PrismaClient } from "@prisma/client";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserServices {
    async createUser(data: { name: string; email: string; password: string; latitude: number; longitude: number; }): Promise<any> {
        if (!data.name || !data.email || !data.password) throw new Error('No data provided');
        if (!validator.isEmail(data.email)) throw new Error('Invalid email format');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.seller.create({
            data: {
                storeName: data.name,
                email: data.email,
                password: hashedPassword,
                latitude: data.latitude,
                longitude: data.longitude,
            }
        })

        const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.storeName}, process.env.JWT_SECRET!, { expiresIn: "48h" });

        return { message: 'Seller account created successfully.', token: token };
    }

    async loginUser(data: { email: string, password: string; }): Promise<any> {
        if (!data.email || !data.password) throw new Error('No data provided');
        if (!validator.isEmail(data.email)) throw new Error('Invalid email format');

        const user = await prisma.seller.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                storeName: true,
                email: true,
                password: true,
                products: true,
            }
        });

        if (!user) throw new Error("User not found.")

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) throw new Error("Incorrect password.");

        const token = jwt.sign({ id: user.id, email: data.email, name: user.storeName}, process.env.JWT_SECRET!, { expiresIn: "48h" });

        const { id, email, storeName } = user;
        const user_data = { id, email, name: storeName, token: token, user_products: user.products };

        return { success: true, data: user_data };
    }
}