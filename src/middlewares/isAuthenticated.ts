import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { env } from "@/env";

type Payload = {
  sub: string;
};

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, env.JWT_SECRET) as Payload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
