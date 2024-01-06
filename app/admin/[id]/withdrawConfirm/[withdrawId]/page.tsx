import ConfirmWithdraw from "@/app/components/withdrawConfirm/ConfirmWithdraw";
import DeclineWithdraw from "@/app/components/withdrawConfirm/DeclineWithdraw";
import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { withdrawId } = params;

  const withdraw = await prisma.transaction.findUnique({
    where: {
      id: withdrawId,
    },
    include: {
      account: {
        include: {
          user: true,
        },
      },
    },
  });

  const { account, amount, status, mpesaCode } = withdraw;
  const { user } = account;

  const afterFee = amount - amount * 0.1;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Withdrawal Confirmation
      </h1>
      <div className="bg-white shadow-md rounded px-4 md:px-40 py-5">
        <div className="flex justify-center flex-col items-center">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">User Name:</h2>
            <span className="text-gray-700">{user.firstName}</span>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">Phone Number:</h2>
            <span className="text-gray-700">{user.phoneNumber}</span>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">Amount:</h2>
            <span className="text-gray-700">{afterFee}</span>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">Status:</h2>
            <span className="text-gray-700">{status}</span>
          </div>

          {/* Your buttons or confirmation elements can go here */}

          <div className="flex items-center mt-4">
            <ConfirmWithdraw withdrawId={withdrawId} />
            <DeclineWithdraw
              userId={user.id}
              withdrawId={withdrawId}
              amount={amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
