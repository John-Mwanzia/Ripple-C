import prisma from "@/modules/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { withdrawId } = await req.json();

  const withdraw = await prisma.transaction.findUnique({
    where: {
      id: withdrawId,
    },
  });

  if (!withdraw) {
    return NextResponse.json({
      status: "error",
      message: "Withdraw not found",
    });
  }

  if (withdraw.status === "FAILED") {
    return NextResponse.json({
      status: "error",
      message: "Withdraw already declined",
    });
  }

  if (withdraw.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Withdraw already approved",
    });
  }

  //   now confirm the withdraw

  try {
    const withdraw = await prisma.transaction.update({
      where: {
        id: withdrawId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      status: "success",
      message: "Withdraw confirmed",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
};
