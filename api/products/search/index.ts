import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ProductController } from "../../../controllers/Product.controller.js";

const productController = new ProductController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, latitude, longitude, radium_km } = req.query;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ error: "Name, latitude, and longitude are required" });
    }

    const result = await productController.searchProduct({
      name: String(name),
      latitude: Number(latitude),
      longitude: Number(longitude),
      radium_km: radium_km ? Number(radium_km) : 5,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
