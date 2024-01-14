import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Account: {
        include: {
          Transaction: {
            where: {
              type: "WITHDRAWAL",
            },
          },
        },
      },
    },
  });


  return (
    <div>
      <div className="bg-[#39B54A] w-full px-6 py-4 flex justify-between items-center">
        <h1>withdraw history </h1>
        <h3>For {user.firstName}</h3>
      </div>
      {//map throough the transactions of withdraw type except the ones for recharge
      user.Account[0].Transaction.map((transaction) => (
        <div
          key={transaction.id}
          className="border-b border-gray-200 px-4 py-4"
        >
          {/* Display WITHDRAW transactions */}
          <div className="flex items-center justify-between whitespace-nowrap text-ellipsis">
            <span className="font-semibold"> ID:</span>
            <span className="text-ellipsis">{transaction.id}</span>
          </div>
          {/* ... other transaction details ... */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Status:</span>
            <span
              className={`text-${
                transaction.status === "PENDING"
                  ? "text-red-300"
                  : "text-green-500"
              }`}
            >
              {transaction.status}
            </span>
          </div>
          {/* ... other details ... */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Amount:</span>
            <span>{transaction.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Date:</span>
            <span>{new Date(transaction.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
