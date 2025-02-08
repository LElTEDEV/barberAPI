import { Request, Response } from "express";

import { UserDetailService } from "@/services/user/DetailUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const userDetailService = new UserDetailService();
    const detailUser = await userDetailService.execute(user_id);

    return res.status(200).json(detailUser);
  }
}
