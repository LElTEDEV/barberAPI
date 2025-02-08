import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "@/prisma";
import { env } from "@/env";

type AuthUserRequest = {
  email: string;
  password: string;
};

export class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new Error("E-mail or password incorrect");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("E-mail or password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      endereco: user.endereco,
      subscription: user.subscriptions && {
        id: user.subscriptions.id,
        status: user.subscriptions.status,
      },
      token,
    };
  }
}
