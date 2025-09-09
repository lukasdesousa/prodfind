import cloudinary from "../config/cloudinaryConfig.js";

export class UploadServices {
  async handleUpload(data: string): Promise<string> {
    if (!data) throw new Error("No image provided");

    let uploadData = data;

    if (!data.startsWith("data:") && !data.startsWith("http")) {
      uploadData = `data:image/png;base64,${data}`;
    }

    const upload = await cloudinary.uploader.upload(uploadData, {
      folder: "fond_uploads",
    });

    return upload.secure_url;
  }
}
