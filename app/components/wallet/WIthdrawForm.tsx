"use client";

import prisma from "@/modules/db";
import React from "react";
import toast from "react-hot-toast";

export default function WIthdrawForm({ balance, accountId }) {
  const handleWithdraw = async (formData: FormData) => {
    "use server ";

    const amount = Number(formData.get("amount"));
    if (amount < 100) {
      // Handle error
      toast.error("Minimum withdrawal amount is Ksh: 100");
    }
    if (amount > balance) {
      // Handle error
      toast.error("Insufficient funds");
    }

    // Make request to backend
    // transaction type = WITHDRAW

    const data = {
      amount,
      type: "WITHDRAW",
    };

    try {
      const response = await prisma.transaction.create({
        data: {
          amount,
          type: "WITHDRAWAL",
          status: "PENDING",
          account: {
            connect: {
              id: accountId,
            },
          },
        },
      });

      if (response) {
        toast.success("Withdrawal request sent");
      } else {
        toast.error("Error sending withdrawal request");
      }
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Error sending withdrawal request");
    }
  };

  return (
    <form action={handleWithdraw}>
      <div className="flex flex-col gap-2 px-4 mt-4">
        <label htmlFor=""> Withdraw Amount</label>
        <input
          type="number"
          name="amount"
          className="border px-2 py-1 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          inputMode="numeric"
        />
      </div>
      <button
        type="submit"
        className="bg-[#F6D6D6] px-6 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        withdraw
      </button>
    </form>
  );
}
