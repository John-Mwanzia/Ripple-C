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
    <div className="bg-gradient-to-r from-[#E95514] to-[#F6D6D6] min-h-screen">
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
              <tr key={user.id} className="bg-white border-b border-gray-200">
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2">{user.Account[0].balance}</td>
                <td className="px-4 py-2">
                  {/* Investments */}
                  <div>
                    {user.investments.map((investment, index) => (
                      <div key={index} className="mb-2 flex gap-12">
                        <div className="font-bold">Investment {index + 1}</div>
                        <div className="flex flex-col">
                          <h3 className="font-bold ">Product Name</h3>
                          <span> {investment.product.productName}</span>
                        </div>
                        <div className="flex flex-col">
                          {" "}
                          <h3 className="font-bold "> Amount</h3>{" "}
                          <span>{investment.amount}</span>{" "}
                        </div>

                        {/* Display other investment details like product image and daily income */}
                        <div className="flex flex-col">
                          <h3 className="font-bold">Product Image</h3>
                          <Image
                            src={investment.product.productImage}
                            width={100}
                            height={100}
                            alt="product image"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold">Daily Income</h3>

                          <span>{investment.product.dailyIncome}</span>
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
                  {user.Account[0].Transaction.map((transaction) => (
                    <div key={transaction.id}>
                      <div className="flex flex-col">
                        <h3 className="font-bold">Transaction ID</h3>
                        <span>{transaction.id}</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold">Status</h3>
                        <span className="text-[#E95514] font-semibold">
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold">Amount</h3>
                        <span>{transaction.amount}</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold">Transaction Date</h3>
                        <span>
                          {" "}
                          {new Date(transaction.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
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
