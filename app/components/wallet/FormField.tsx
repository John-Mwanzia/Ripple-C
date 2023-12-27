"use client";

import { transactionInit } from "@/handlers/api";
import React, { useState } from "react";

const inputAmount = [
  800,
  1600,
  2000,
  5000,
  10000,
  12000,
  15000,
  20000,
  25000,
  30000,
  40000,
  50000,
  80000,
  100000,
];

export default function FormField({ userId, phoneNumber }) {
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Make request to backend
    // transaction type = recharge

    const data = {
      phoneNumber,
      amount,
      type: "RECHARGE",
    };

    const response = await transactionInit(data);

    console.log(response);

    // Redirect to mpesa
    // Redirect to success page
  };
  return (
    <form action="" className="mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="">Amount</label>
        <input
          type="number"
          className="border px-2 py-1 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={amount}
          onChange={(e) => setAmount((e.target.value as unknown) as number)}
          inputMode="numeric"
        />
      </div>
      {/* create selectors of amount which when clicked(state amount) the amount is set as the value of input */}
      <div className="flex gap-2 overflow-x-hidden flex-wrap mt-4 ">
        {inputAmount.map((amount) => (
          <button
            key={amount}
            type="button"
            className="bg-[#F6D6D6] px-4 py-1 rounded-lg shadow-md"
            onClick={() => setAmount(amount)}
          >
            {amount}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="bg-[#F6D6D6] px-4 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        Recharge
      </button>
    </form>
  );
}
