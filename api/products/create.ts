import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ProductController } from "../../controllers/Product.controller.js";

const productController = new ProductController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const result = await productController.createProduct(req.body);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
