import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { userId, amount, id } = await req.json();

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

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
  });

  if (transaction.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Payment already confirmed",
    });
  }
  // check if it already failed
  if (transaction.status === "FAILED") {
    return NextResponse.json({
      status: "error",
      message: "Payment already declined",
    });
  }

  if (transaction.amount !== amount) {
    return NextResponse.json({
      status: "error",
      message: "Amount does not match",
    });
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id,
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
