import type { Request, Response } from 'express';
import { SellerServices } from '../services/SellerServices.js';

export class SellerController {
    private sellerServices: SellerServices;

    constructor() {
        this.sellerServices = new SellerServices();
    }

    async createSeller(req: Request, res: Response): Promise<Response> {
        try {
            const { storeName, email, password, location } = await req.body;

            if (!storeName || !email || !password || !location) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const result = await this.sellerServices.createSeller({ storeName, email, password, location });

            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({
                error: (err as Error).message,
            });
        }
    }
}