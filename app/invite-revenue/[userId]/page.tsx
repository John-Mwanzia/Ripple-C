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
    <div>
      <h1>Invite Revenue</h1>
      <h2>{user.inviteRevenue}</h2>
    </div>
  );
}
