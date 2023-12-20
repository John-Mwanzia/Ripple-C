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

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }