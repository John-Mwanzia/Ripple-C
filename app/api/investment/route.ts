import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const {
    phoneNumber,
    productName,
    productPrice,
    revenueCycle,
    dailyIncome,
    totalIncome,
  } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
    include: {
      Account: true,
      referrer: true,
      referee: true,
    },
  });

  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  const investment = await prisma.investment.create({
    data: {
      user: {
        connect: {
          phoneNumber,
        },
      },
      amount: productPrice,
      status: "ACTIVE",
      cycle: revenueCycle,
      dailyIncome,
      totalIncome,
    },
  });

  // after successful investment creation, update a deduction of the amount from the user's  account
  const newBalance = user.Account[0].balance - productPrice;
  await prisma.account.update({
    where: {
      id: user.Account[0].id,
    },
    data: {
      balance: newBalance,
    },
  });

  return NextResponse.json({ data: investment }, { status: 200 });
};
