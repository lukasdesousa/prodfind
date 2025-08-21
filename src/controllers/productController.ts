import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { sellerId, stock, name, description, price, keys } = req.body;
    
        if(!sellerId || !stock || !name || !description || !price || !keys) return res.status(400).json({ error: 'All fields are required.' });
    
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                price: price,
                stock: stock,
                seller: { connect: { id: sellerId } },
                description: description,
                keys: keys,
            }
        })

        return res.status(201).json({
            message: 'Product created successfully.',
            product: newProduct
        });
    } catch(err) {
        return res.status(500).json({
            error: err
        });
    }

};