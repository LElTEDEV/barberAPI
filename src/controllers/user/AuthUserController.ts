import { Request, Response } from "express";
import { z } from "zod";

import { AuthUserService } from "@/services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const authUserService = new AuthUserService();
    const session = await authUserService.execute({ email, password });

    return res.status(200).json(session);
  }
}
