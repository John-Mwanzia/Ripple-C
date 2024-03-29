import ConfirmButton from "@/app/components/paymentConfirm/ConfirmButton";
import DeclineButton from "@/app/components/paymentConfirm/DeclineButton";
import ConfirmWithdraw from "@/app/components/withdrawConfirm/ConfirmWithdraw";
import DeclineWithdraw from "@/app/components/withdrawConfirm/DeclineWithdraw";
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
  console.log(user.Account[0].Transaction);

  return (
    <div className="bg-gray-50 min-h-screen mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <div className="flex items-center justify-between mb-4">
              <span>Name:</span>
              <span>{user.firstName}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Phone Number:</span>
              <span>{user.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Account Balance:</span>
              <span>{user.Account[0].balance}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Investments</h3>
            {user.investments.map((investment) => (
              <div
                key={investment.id}
                className="border-b border-gray-200 py-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Product Category:</span>
                  <span>{investment.product.category}</span>
                </div>
                {/* product image */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Product Image:</span>
                  <span>
                    <img
                      src={investment.product.productImage}
                      width={30}
                      height={30}
                      alt="product image"
                    />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amount:</span>
                  <span>{investment.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Daily Income:</span>
                  <span>{investment.product.dailyIncome}</span>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <span className="font-semibold">Total Investment Amount:</span>
              <span>
                {user.investments.reduce(
                  (acc, investment) => acc + investment.amount,
                  0
                )}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Total Daily Income:</span>
              <span>
                {user.investments.reduce(
                  (acc, investment) => acc + investment.product.dailyIncome,
                  0
                )}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Transactions</h3>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Recharge Transactions
              </h4>
              {user.Account[0].Transaction.filter(
                (transaction) => transaction.type === "RECHARGE"
              ).map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-b border-gray-200 py-4"
                >
                  {/* Display RECHARGE transactions */}
                  {/* Display Mpesa Code */}
                  {transaction.mpesaCode && (
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Mpesa Code:</span>
                      <span>{transaction.mpesaCode}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Transaction ID:</span>
                    <span>{transaction.id}</span>
                  </div>
                  {/* ... other transaction details ... */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`text-${
                        transaction.status === "PENDING"
                          ? "text-[#E95514]"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    {transaction.status === "PENDING" && (
                      <>
                        <ConfirmButton
                          userId={userId}
                          amount={transaction.amount}
                          id={transaction.id}
                        />
                        <DeclineButton userId={userId} id={transaction.id} />
                      </>
                    )}
                  </div>
                  {/* ... other details ... */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Amount:</span>
                    <span>{transaction.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>
                      {new Date(transaction.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Withdrawal Transactions
              </h4>
              {user.Account[0].Transaction.filter(
                (transaction) => transaction.type === "WITHDRAWAL"
              ).map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-b border-gray-200 py-4"
                >
                  {/* Display WITHDRAW transactions */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Transaction ID:</span>
                    <span>{transaction.id}</span>
                  </div>
                  {/* ... other transaction details ... */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`text-${
                        transaction.status === "PENDING"
                          ? "text-[#E95514]"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    {transaction.status === "PENDING" && (
                      <>
                        <ConfirmWithdraw withdrawId={transaction.id} />

                        <DeclineWithdraw
                          userId={userId}
                          withdrawId={transaction.id}
                          amount={transaction.amount}
                        />
                      </>
                    )}
                  </div>
                  {/* ... other details ... */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Amount:</span>
                    <span>{transaction.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>
                      {new Date(transaction.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
