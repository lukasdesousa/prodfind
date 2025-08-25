import type { Request, Response } from "express";
import { UploadServices } from "../services/UploadServices.js";

export class UploadController {
  private uploadServices: UploadServices;

  constructor() {
    this.uploadServices = new UploadServices();
  }

  async upload(req: Request, res: Response): Promise<Response> {
    try {
      if(!req.file) return res.status(400).json({ error: "No file uploaded" });

      const url = await this.uploadServices.handleUpload(req.file!);

      return res.status(200).json({ message: "Image uploaded successfully", image_url: url });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}