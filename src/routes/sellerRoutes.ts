import express from 'express';
import { SellerController } from '../controllers/SellerController.js';

const router = express.Router();
const sellerController = new SellerController();

router.post('/register', sellerController.createSeller.bind(sellerController));

export default router;