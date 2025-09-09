import { ProductServices } from '../services/ProductServices.js';
import type { CreateProduct, SearchProducts } from '../types/products/ProductsType.js';

export class ProductController {
    private productServices: ProductServices;

    constructor() {
        this.productServices = new ProductServices();
    }

    async createProduct(data: CreateProduct) {
        try {
            const { seller_id, name, description, stock, keys, price, latitude, longitude } = data;

            if (!seller_id || !name || !description || !price || !stock || !keys) {
                throw new Error("All fields are required!");
            }

            return this.productServices.createProduct({ seller_id, name, description, stock, keys, price, latitude, longitude });
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }

    async searchProduct(data: SearchProducts) {
        try {
            const { name, latitude, longitude, radium_km } = await data;

            if (!name || !latitude || !longitude) {
                throw new Error("Name, altitude and longitude are required!");
            }

            return this.productServices.searchProducts({ name, latitude, longitude, radium_km })
        } catch (error) {
            throw new Error(`${(error as Error).message}`)
        }
    }
}