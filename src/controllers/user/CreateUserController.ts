import { Request, Response } from "express";
import { z } from "zod";

import { CreateUserService } from "@/services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  }
}
