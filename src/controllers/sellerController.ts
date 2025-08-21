import type { Request, Response } from 'express';
import validator from 'validator';
import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerSeller = async (req: Request, res: Response) => {
    try {

        const { storeName, email, password, location } = req.body;

        if (!storeName || !email || !password || !location) return res.status(400).json({ error: 'All fields are required.' });

        if (storeName.length < 6) return res.status(400).json({ error: 'Store name must be at least 6 characters long.' });

        if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });

        if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters long.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.seller.create({
            data: {
                storeName,
                email,
                password: hashedPassword,
                location,
            }
        })

        return res.status(201).json({
            message: 'Seller account created successfully.',
            seller: data,
        });
    } catch (err: any) {
        if (err.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        return res.status(500).json({
            error: err,
        })
    }
};