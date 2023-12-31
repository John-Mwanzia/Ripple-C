import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { id } = params;
  const response = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Account: {
        include: {
          Transaction: true,
        },
      },
    },
  });

  return (
    <div className="">
      <div className="bg-[#E95514]/80 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Recharge history</h1>
        <h2 className="text-lg font-semibold mb-2">
          Account balance: {response.Account[0].balance}
        </h2>
      </div>
      <h2 className="text-lg font-semibold mb-2">Transaction history:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {response.Account[0].Transaction.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 shadow-md rounded-lg bg-white flex justify-between items-start"
          >
            <div>
              <p className="text-base">Amount: {transaction.amount}</p>
              <p className="text-base">Type: {transaction.type}</p>
              <p className="text-base">
                Date: {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-base mr-2">Status:</p>
              <p
                className="text-base text-[#E95514] font-semibold"
                style={{ whiteSpace: "nowrap" }}
              >
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
