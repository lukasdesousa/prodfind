import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const { name, location } = await req.body;

        if (!name) return res.status(400).json({ error: 'All fields are required.' });

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                seller: {
                    location: {
                        contains: location,
                        mode: 'insensitive',
                    }
                }
            },
            include: {
                seller: true,
            }
        })

        return res.status(201).json({
            message: 'We found this products',
            product: products
        });
    } catch (err) {
         return res.status(500).json({
            error: err,
        });
    }
}