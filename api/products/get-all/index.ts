import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ProductController } from "../../../controllers/Product.controller.js";

const productController = new ProductController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { latitude, longitude, radium_km } = req.body;

    if (!latitude || !longitude || !radium_km) {
      return res.status(400).json({ error: "longitude, latitude, and longitude are required" });
    }

    const result = await productController.get_all({
        latitude: latitude,
        longitude: longitude,
        radium_km: radium_km,
    })

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
