import { SellerServices } from '../services/SellerServices.js';
import type { SellerType } from '../types/seller/SellerTypes.js';

export class SellerController {
    private sellerServices: SellerServices;

    constructor() {
        this.sellerServices = new SellerServices();
    }

    async createSeller(data: SellerType) {
        try {
            const { name, email, password } = data;

            if (!name || !email || !password) {
                throw new Error("All fields are required!")
            }

            return this.sellerServices.createSeller({ name, email, password });
        } catch (err) {
           throw new Error(`Error: ${(err as Error).message}`)
        }
    }
}