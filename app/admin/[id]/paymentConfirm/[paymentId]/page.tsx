import ConfirmButton from "@/app/components/paymentConfirm/ConfirmButton";
import DeclineButton from "@/app/components/paymentConfirm/DeclineButton";
import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { paymentId } = params;
  const decodedCombinedIds = decodeURIComponent(paymentId);
  // Split the IDs
  const [userId, paymentID] = decodedCombinedIds.split("-");
  console.log(userId, paymentID);

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
    },
  });

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: paymentID,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Payment Confirmation
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
            <span className="text-gray-700">{transaction.amount}</span>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">Status:</h2>
            <span className="text-gray-700">{transaction.status}</span>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-3">MPESA Code:</h2>
            <span className="text-gray-700">{transaction.mpesaCode}</span>
          </div>
          <div className="flex items-center mt-4">
            <ConfirmButton
              userId={userId}
              amount={transaction.amount}
              id={paymentID}
            />
            <DeclineButton userId={userId} id={paymentID} />
          </div>
        </div>
      </div>
    </div>
  );
}
