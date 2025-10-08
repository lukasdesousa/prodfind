import { ProductServices } from '../services/Product.service.js';
import type { CreateProduct, GetAll, SearchProducts } from '../types/products/ProductsType.js';

export class ProductController {
    private productServices: ProductServices;

    constructor() {
        this.productServices = new ProductServices();
    }

    async createProduct(data: CreateProduct) {
        try {
            const { seller_id, name, description, stock, price, latitude, longitude, imagesUrl, preferences } = data;

            if (data) {
                throw new Error("All fields are required!");
            }

            return this.productServices.createProduct({ seller_id, name, description, stock, price, latitude, longitude, imagesUrl, preferences });
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }

    async searchProduct(data: SearchProducts) {
        try {
            const { name, latitude, longitude, radium_km } = data;

            if (!name || !latitude || !longitude) {
                throw new Error("Name, altitude and longitude are required!");
            }

            return this.productServices.searchProducts({ name, latitude, longitude, radium_km })
        } catch (error) {
            throw new Error(`${(error as Error).message}`)
        }
    }

    async get_all(data: GetAll) {
        try {
            const { latitude, longitude, radium_km } = data;

            if (!longitude || !latitude || !radium_km) {
                throw new Error("Longitude, altitude and radium_km are required!");
            }

            return this.productServices.get_all({
                latitude: latitude,
                longitude: longitude,
                radium_km: radium_km
            })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}