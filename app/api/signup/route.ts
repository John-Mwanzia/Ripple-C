import { generateToken, hashPassword } from "@/modules/auth";
import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const request = await req.json();
  const { phoneNumber, firstName, password, referralCode, referrer } = request;
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });
  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
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
          referralCode: referrer,
        },
      },
    },
  });

  // Connect the secondary referrer, if applicable
  if (referrer) {
    const secondaryReferrer = await prisma.user.findUnique({
      where: { referralCode: referrer },
      select: { id: true }, // Optimize query by selecting only the necessary field
    });
    if (secondaryReferrer) {
      await prisma.user.update({
        where: { id: newUser.id },
        data: {
          secondaryReferrer: {
            connect: { id: secondaryReferrer.id }, // Connect to secondary referrer
          },
        },
      });
    }
  }

  const newAccount = await prisma.account.create({
    data: {
      userId: newUser.id.toString(),
      balance: 50.0,
      level: 1,
      dailyEarningRate: 0.0,
    },
  });

  const token = generateToken(newUser);

  return NextResponse.json({ token }, { status: 200 });
};
