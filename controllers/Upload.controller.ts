import { UploadServices } from "../services/UploadServices.js";

export class UploadController {
  private uploadServices: UploadServices;

  constructor() {
    this.uploadServices = new UploadServices();
  }

  async upload(data: any) {
    try {
      if(!data) throw new Error("No image provided.");

      const url = await this.uploadServices.handleUpload(data!);

      return ({ message: "Image uploaded successfully", image_url: url });
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}