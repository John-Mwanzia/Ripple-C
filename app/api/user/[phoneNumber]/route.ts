import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }) => {
  const { phoneNumber } = params;
  

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
    include: {
      Account: true,
      referrer: true,
      referee: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 404 }
    );
  }


  return NextResponse.json({ data: user }, { status: 200 });
};
