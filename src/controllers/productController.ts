import type { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
    const { sellerId, stock, name, description, price, keys } = req.body;

    if(!sellerId || !stock || !name || !description || !price || !keys) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = {
        sellerId,
        stock,
        name,
        description,
        price,
        keys,
    }

    return res.status(201).json({
        message: 'Product created successfully.',
        product: newProduct
    });
};