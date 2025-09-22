import type { VercelRequest, VercelResponse } from "@vercel/node";
import { UserController } from "../../../controllers/User.controller.js"

const userController = new UserController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const result = await userController.loginUser({
      email: email,
      password: password
    });
    
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
