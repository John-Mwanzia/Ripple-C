import prisma from "@/modules/db";
import React from "react";

export default async function page({ params }) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      investments: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div>
      {user.investments ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Investments</h3>
          {user.investments.map((investment) => (
            <div key={investment.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Product Name:</span>
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
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Investments</h3>
          <p className="text-gray-800 font-semibold">No Investments Yet</p>
        </div>
      )}
    </div>
  );
}
