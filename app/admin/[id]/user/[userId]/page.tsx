import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Account: {
        include: {
          Transaction: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },

      investments: {
        include: {
          product: true,
        },
      },
    },
  });

  return <div>confirm payment for {userId}</div>;
}
