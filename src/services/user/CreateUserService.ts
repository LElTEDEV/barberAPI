import { hash } from "bcryptjs";

import { prisma } from "@/prisma";

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User/Email already exists");
    }

    const password_hash = await hash(password, 6);

    const user = await prisma.user.create({
      data: { name, email, password: password_hash },
      select: { name: true, email: true, id: true },
    });

    return user;
  }
}
