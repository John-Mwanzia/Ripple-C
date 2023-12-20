import { comparePassword, generateToken } from "@/modules/auth";
import prisma from "@/modules/db";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const res = new NextResponse();

  const request = await req.json();
  const { phoneNumber, password } = request;

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });
  if (!user) {
    return {
      status: 404,
      body: { message: "User not found" },
    };
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return {
      status: 401,
      body: { message: "Invalid password" },
    };
  }
  const token = generateToken(user);
  setCookie('auth_token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return NextResponse.json({ token });
};
