import express from 'express';
import { UploadController } from '../controllers/UploadController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
const uploadController = new UploadController();

router.post('/upload', upload.single('image'), uploadController.upload.bind(uploadController));

export default router;