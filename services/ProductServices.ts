import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export class ProductServices {
    async createProduct(data: { seller_id: string, name: string, description: string, stock: number; keys: string[]; price: number, latitude: number, longitude: number }): Promise<any> {

        if (!data.seller_id || !data.name || !data.description || !data.price) throw new Error('No data provided');

        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                seller: { connect: { id: data.seller_id } },
                latitude: data.latitude,
                longitude: data.longitude,
                description: data.description,
                keys: data.keys,
            }, include: {
                seller: {
                    select: { id: true, storeName: true },
                },
            },
        });

        return { message: 'Product created successfully', newProduct };
    }

    async searchProducts(data: { name: string; latitude?: number; longitude: number, radium_km: number }): Promise<any> {
        if (!data.name || !data.latitude || !data.longitude) throw new Error('No data provided');

        const radium_km = data.radium_km * 1000

        const products = await prisma.$queryRaw`
            SELECT *, 
                ST_Distance(
                    ST_SetSRID(ST_MakePoint(longitude, latitude), 4326),
                    ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)
                ) AS distance
            FROM "Product"
            WHERE name ILIKE '%' || ${data.name} || '%'
            AND ST_DWithin(
                ST_SetSRID(ST_MakePoint(longitude, latitude), 4326),
                ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326),
                ${radium_km} -- raio em metros
            )
            ORDER BY distance ASC;
        `;

        return { message: 'We found these products', products };
    }

    async get_all(data: { latitude: number, longitude: number, radium_km: number }) {
        if (!data.latitude || !data.longitude || !data.radium_km) throw new Error("Undefined latitude and longitude")

        const radium_m = data.radium_km * 1000;

        const products = await prisma.$queryRaw`
        SELECT *,
            ST_Distance(
            ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision), 4326),
            ST_SetSRID(ST_MakePoint(${data.longitude}::double precision, ${data.latitude}::double precision), 4326)
            ) AS distance
        FROM "Product"
        WHERE ST_DWithin(
            ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision), 4326),
            ST_SetSRID(ST_MakePoint(${data.longitude}::double precision, ${data.latitude}::double precision), 4326),
            ${radium_m}  -- raio em metros
        )
        ORDER BY distance ASC;
        `;

        return { message: 'We found these products', products };
    }
}