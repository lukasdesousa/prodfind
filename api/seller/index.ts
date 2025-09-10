import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SellerController } from "../../controllers/Seller.controller.js"

const sellerController = new SellerController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, password } = req.body;

    const result = await sellerController.createSeller({
      name: name,
      email: email,
      password: password
    });
    
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
