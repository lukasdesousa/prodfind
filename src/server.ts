import express from 'express';
import type { Request, Response } from 'express';
import sellerRoutes from './routes/sellerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor rodando');
});

app.use('/sellers', sellerRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});