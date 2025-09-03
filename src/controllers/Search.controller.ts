import type { Request, Response } from 'express';
import { SearchServices } from '../services/SearchServices.js';

export class SearchController {
    private searchServices: SearchServices;

    constructor() {
        this.searchServices = new SearchServices();
    }

    async search(req: Request, res: Response): Promise<Response> {
        try {  
            const { name, location } = await req.body;

            if (!name || !location) return res.status(400).json({ error: 'Name and location are required.' });

            const result = await this.searchServices.searchProducts({name, location})

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({
                error: (err as Error).message,
            });
        }
    }
}

