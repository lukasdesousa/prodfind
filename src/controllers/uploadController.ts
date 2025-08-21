import type { Request, Response } from "express";
import cloudinary from "../config/cloudinaryConfig.js";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image was sent.' });
    }

    const base64 = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;
    
    const upload = await cloudinary.uploader.upload(dataUri, {
      folder: 'fond_uploads',
    });

    return res.json({
      message: "Upload completed successfully!",
      url: upload.secure_url,
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Intern error', error: err instanceof Error ? err.message : 'Unknown error' });
  }
};