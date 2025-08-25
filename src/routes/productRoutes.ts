import express from 'express';
import { ProductController } from '../controllers/productController.js';
import { SearchController } from '../controllers/searchController.js';

const router = express.Router();

const searchController = new SearchController();
const productController = new ProductController();

router.post('/create', productController.createProduct.bind(productController));
router.get('/search', searchController.search.bind(searchController));

export default router;