import { generateToken, hashPassword } from "@/modules/auth";
import prisma from "@/modules/db";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const request = await req.json();
    const { phoneNumber, firstName, password } = request;
    const user = await prisma.user.findUnique({
        where: {
        phoneNumber: phoneNumber,
        },
    });
    if (user) {
        return {
        status: 409,
        body: { message: "User already exists" },
        };
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
        firstName,
        phoneNumber,
        password: hashedPassword,
        },
    });
    const token = generateToken(newUser);

    setCookie('auth_token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    return NextResponse.json({ token });
    }