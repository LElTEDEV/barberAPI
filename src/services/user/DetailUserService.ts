import { prisma } from "@/prisma";

export class UserDetailService {
  async execute(user_id: string) {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        endereco: true,

        subscriptions: {
          select: { id: true, priceId: true, status: true },
        },
      },
    });

    return user;
  }
}
