import WIthdrawForm from "@/app/components/wallet/WIthdrawForm";
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
      investments: true,
    },
  });
  console.log(response.investments);

  return (
    <div>
      <div className="bg-[#E95514]/80 py-2">
        <h1 className="text-center">Withdraw</h1>
        <div className="px-4 mt-4">
          <div className="px-4 ">
            <h1 className="py-2">Account Balance</h1>
            <h2 className="pb-1">Ksh: {response.Account[0].balance}</h2>
          </div>
        </div>
      </div>
      <WIthdrawForm
        balance={response.Account[0].balance}
        accountId={response.Account[0].id}
        investments={response.investments}
      />
      <div className="mt-8 px-4">
        <h2>Withdrawal rules:</h2>
        <p className="">1. Minimum withdrawal amount is Ksh: 100</p>
        <p>2. Withdrawals will arrive in your Mpesa account within 24 hours</p>
        <p>3. Withdrawals are charged a 10% fee</p>
      </div>
    </div>
  );
}
