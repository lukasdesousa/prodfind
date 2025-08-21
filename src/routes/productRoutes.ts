import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { searchProducts } from '../controllers/searchProducts.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/search', searchProducts);

export default router;