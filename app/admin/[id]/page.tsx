import UserData from "@/app/components/admin/UserData";
import prisma from "@/modules/db";
import Image from "next/image";
import React from "react";

export default async function page({ params }) {
  // this id is only for showing a welcome message  to the admin
  const { id } = params;

  //   fetch every collection and display them in a table

  const response = await prisma.user.findMany({
    include: {
      Account: {
        include: {
          Transaction: true,
        },
      },
      investments: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className=" min-h-screen">
      <UserData data={response} />
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white">Welcome Admin {id}</h1>
        <table className="min-w-full border-2 border-gray-500 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Account Balance</th>
              <th className="px-4 py-2">Investments</th>
              <th className="px-4 py-2">Total investment amount</th>
              <th className="px-4 py-2">Total daily income</th>
              <th className="px-4 py-2"> Transactions</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {response.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2">{user.Account[0].balance}</td>
                <td className="px-4 py-2">
                  {/* Investments */}
                  <div className="flex flex-col">
                    {user.investments.map((investment, index) => (
                      <div
                        key={index}
                        className="flex border border-gray-300 mb-4 p-4"
                      >
                        <div className="grid grid-cols-4 gap-4">
                          <div className="flex flex-col">
                            <h3 className="font-bold mb-1">Product Name</h3>
                            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {investment.product.productName}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-bold mb-1">Amount</h3>
                            <span>{investment.amount}</span>
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-bold mb-1"> Image</h3>
                            <img
                              src={investment.product.productImage}
                              width={30}
                              height={30}
                              alt="product image"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-bold mb-1">Daily Income</h3>
                            <span>{investment.product.dailyIncome}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {user.investments.reduce(
                    (acc, investment) => acc + investment.amount,
                    0
                  )}
                </td>
                <td className="px-4 py-2">
                  {/* add all daily incomes */}
                  {user.investments.reduce(
                    (acc, investment) => acc + investment.product.dailyIncome,
                    0
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    {user.Account[0].Transaction.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex  flex-col border border-gray-300 mb-4 p-4"
                      >
                        <div className="flex- flex-col gap-4 w-full">
                          <div className="flex gap-4">
                            <h3 className="font-bold"> ID</h3>
                            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {transaction.id}
                            </span>
                          </div>
                          <div className="flex gap-4  ">
                            <h3 className="font-bold">Status</h3>
                            <span className="text-[#E95514] font-semibold">
                              {transaction.status}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <h3 className="font-bold">Amount</h3>
                            <span>{transaction.amount}</span>
                          </div>
                          <div className="flex gap-4">
                            <h3 className="font-bold"> Date</h3>
                            <span className="whitespace-nowrap">
                              {new Date(transaction.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {/* Add actions buttons or links */}
                  {/* Example: */}
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
