import type { VercelRequest, VercelResponse } from "@vercel/node";
import { UploadController } from "../../controllers/Upload.controller.js";

const uploadController = new UploadController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "No file data provided" });
    }

    const result = await uploadController.upload(data);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
