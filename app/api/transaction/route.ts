import prisma from "@/modules/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { phoneNumber, amount, type } = await req.json();
    // use uuid to generate a unique transaction id
    const transactionId = uuidv4();

    // get user account
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
      include: { accounts: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const account = user.accounts[0];

    if (!account) {
      throw new Error("Account not found");
    }
    // create a new transaction

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        status: "PENDING",
        transactionId,
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });

    // return the transaction
    return NextResponse.json({ data: transaction }, { status: 200 });
  } catch (error) {
    throw new Error(error);
  }
};
