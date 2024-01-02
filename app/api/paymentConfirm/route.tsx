import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { userId, amount } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Account: {
        include: {
          Transaction: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ status: "error", message: "User not found" });
  }

  const recentTransaction = user.Account[0].Transaction[0];

  if (recentTransaction.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Payment already confirmed",
    });
  }

  if (recentTransaction.amount !== amount) {
    return NextResponse.json({
      status: "error",
      message: "Amount does not match",
    });
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: recentTransaction.id,
    },
    data: {
      status: "COMPLETED",
    },
  });

  //  Update user account balance

  const acccount = user.Account[0];

  const updatedAccount = await prisma.account.update({
    where: {
      id: acccount.id,
    },
    data: {
      balance: acccount.balance + amount,
    },
  });

  return NextResponse.json({ status: "success", message: "Payment confirmed" });
};
