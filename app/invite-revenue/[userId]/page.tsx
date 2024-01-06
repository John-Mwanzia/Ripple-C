import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { userId } = params;

  // fetch user invite revenue

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      inviteRevenue: true,
    },
  });

  console.log(user.inviteRevenue);

  return (
    <div className="bg-white overflow-x-hidden">
      <div className="bg-orange-400 bg-opacity-80 text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Invite Revenue</h1>
      </div>
      <h2 className="text-2xl px-20 mt-6 font-semibold">
        Ksh: {user.inviteRevenue}
      </h2>
    </div>
  );
}
