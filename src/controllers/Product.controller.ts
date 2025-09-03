import type { Request, Response } from 'express';
import { ProductServices } from '../services/ProductServices.js';

export class ProductController {
    private productServices: ProductServices;

    constructor() {
        this.productServices = new ProductServices();
    }

    async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { sellerId, name, description, stock, keys, price } = req.body;
            
            // VALIDAÇÃO SIMPLES, PARA TESTES
            if (!sellerId || !name || !description || !price || !stock || !keys) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const result = await this.productServices.createProduct({ sellerId, name, description, stock, keys, price });
            
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}