import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ProductController } from "../../../controllers/Product.controller.js";

const productController = new ProductController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "Product id is required" });
    }

    const result = await productController.getOne({
        product_id: product_id,
    })

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
