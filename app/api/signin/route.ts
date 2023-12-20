import { comparePassword, generateToken } from "@/modules/auth";
import prisma from "@/modules/db";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const request = await req.json();
  const { phoneNumber, password } = request;

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(user);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  
};
