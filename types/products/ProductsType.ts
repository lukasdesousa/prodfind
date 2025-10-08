export type SearchProducts = {
    name: string;
    longitude: number;
    latitude: number;
    radium_km: number;
}

export type CreateProduct = {
    seller_id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    stock: number;
    imagesUrl: string[];
    price: number;
    preferences: number;
}

export type GetAll = {
    latitude: number;
    longitude: number;
    radium_km: number;
}
