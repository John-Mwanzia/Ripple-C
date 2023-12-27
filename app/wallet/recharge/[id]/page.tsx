import FormField from "@/app/components/wallet/FormField";
import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { id } = params;

  const response = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Account: true,
    },
  });

  return (
    <div>
      <div className="bg-[#E95514]/80 py-2">
        <h1 className="text-center">Recharge</h1>
      </div>
      <div className="px-4 mt-4">
        <div className="bg-[#E95514]/80 px-4 rounded-lg ">
          <h1 className="py-2">Account Balance</h1>
          <h2 className="pb-1">Ksh: {response.Account[0].balance}</h2>
        </div>
        <FormField userId={id} phoneNumber={response.phoneNumber} />
      </div>
    </div>
  );
}
