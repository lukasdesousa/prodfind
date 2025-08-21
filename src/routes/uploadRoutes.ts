import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);

export default router;