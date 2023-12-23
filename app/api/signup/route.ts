import { generateToken, hashPassword } from "@/modules/auth";
import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const request = await req.json();
  const { phoneNumber, firstName, password, referralCode,referrer } = request;
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
        }
      }
    },
  });
  const token = generateToken(newUser);

  return NextResponse.json({ token }, { status: 200 });
};
