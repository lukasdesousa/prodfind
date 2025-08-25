import cloudinary from "../config/cloudinaryConfig.js";

export class UploadServices {
    async handleUpload(file: Express.Multer.File): Promise<string> {
        if(!file) throw new Error('No image has provided')
        
        const base64 = file.buffer.toString('base64');
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const upload = await cloudinary.uploader.upload(dataUri, {
              folder: 'fond_uploads',
        });

        return upload.secure_url;
        
    }
}