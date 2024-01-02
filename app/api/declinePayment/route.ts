import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { userId } = await req.json();

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

  if (!recentTransaction) {
    return NextResponse.json({
      status: "error",
      message: "Transaction not found",
    });
  }

  if (recentTransaction.status === "FAILED") {
    return NextResponse.json({
      status: "error",
      message: "Transaction already declined",
    });
  }

  if (recentTransaction.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Transaction already approved",
    });
  }

  // Fetch the transaction associated with the account
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: recentTransaction.id,
      },
      data: {
        status: "FAILED",
      },
    });

    if (!transaction) {
      return NextResponse.json({
        status: "error",
        message: "Transaction not found",
      });
    }

    return NextResponse.json({
      status: "success",
      message: "Transaction declined",
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
};
