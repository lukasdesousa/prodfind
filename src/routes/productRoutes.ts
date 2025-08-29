import express from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { SearchController } from '../controllers/SearchController.js';

const router = express.Router();

const searchController = new SearchController();
const productController = new ProductController();

router.post('/create', productController.createProduct.bind(productController));
router.get('/search', searchController.search.bind(searchController));

export default router;