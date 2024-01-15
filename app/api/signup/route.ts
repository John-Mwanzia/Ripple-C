import { generateToken, hashPassword } from "@/modules/auth";
import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const request = await req.json();
  const { phoneNumber, firstName, password, referralCode, referrer } = request;

  // Check if the referrer exists
  const existingReferrer = await prisma.user.findUnique({
    where: {
      referralCode: referrer,
    },
  });

  if (!existingReferrer) {
    return NextResponse.json({
      message: "Referrer not found",
      status: "error",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (user) {
    return NextResponse.json({
      message: "User already exists",
      status: "error",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      firstName,
      phoneNumber,
      password: hashedPassword,
      referralCode,
      referrer: {
        connect: {
          id: existingReferrer.id,
        },
      },
    },
  });

  // Connect the secondary referrer, if applicable
  if (existingReferrer.referrerId) {
    const secondaryReferrer = await prisma.user.findUnique({
      where: { id: existingReferrer.referrerId },
      select: { id: true },
    });
    if (secondaryReferrer) {
      await prisma.user.update({
        where: { id: newUser.id },
        data: {
          secondaryReferrer: {
            connect: { id: secondaryReferrer.id },
          },
        },
      });
    }
  }

  const newAccount = await prisma.account.create({
    data: {
      userId: newUser.id.toString(),
      balance: 100.0,
      level: 1,
      dailyEarningRate: 0.0,
    },
  });

  const token = generateToken(newUser);

  return NextResponse.json({ token }, { status: 200 });
};
