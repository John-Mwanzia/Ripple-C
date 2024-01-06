import prisma from "@/modules/db";
import { NextResponse } from "next/server";

// withsrawDecline route
export const POST = async (req: Request, res: Response) => {
  const { userId, withdrawId, amount } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      accounts: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: "error",
      message: "User not found",
    });
  }

  const account = user.accounts[0];

  const withdraw = await prisma.transaction.findUnique({
    where: {
      id: withdrawId,
    },
  });

  if (!withdraw) {
    return NextResponse.json({
      status: "error",
      message: "Withdraw not found",
    });
  }

  if (withdraw.status === "FAILED") {
    return NextResponse.json({
      status: "error",
      message: "Withdraw already declined",
    });
  }

  if (withdraw.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Withdraw already approved",
    });
  }

  // update account balance with the amount which was deducted
  try {
    const userAccount = await prisma.account.findUnique({
      where: {
        id: account.id,
      },
    });

    if (!userAccount) {
      throw new Error("Account not found");
    }

    const newBalance = userAccount.balance + amount;

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }

  // now decline the withdraw

  try {
    const withdraw = await prisma.transaction.update({
      where: {
        id: withdrawId,
      },
      data: {
        status: "FAILED",
      },
    });

    return NextResponse.json({
      status: "success",
      message: "Withdraw declined",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }

  // update account balance with the amount which was deducted
};
