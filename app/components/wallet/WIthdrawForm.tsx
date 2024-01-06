"use client";

import { withdrawAction } from "@/handlers/actions";
import prisma from "@/modules/db";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface FormErrors {
  amount?: string;
  [key: string]: string | undefined;
}

export default function WIthdrawForm({ balance, accountId }) {
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const router = useRouter();

  const handleWithdraw = async (formData: FormData) => {
    const amount = Number(formData.get("amount"));
    if (amount < 100) {
      // Handle error
      toast.error("Minimum withdrawal amount is Ksh: 100");
      return;
    }
    if (amount > balance) {
      // Handle error
      toast.error("Insufficient funds");
      return;
    }

    const schema = Yup.object().shape({
      amount: Yup.number().required("Amount is required"),
    });
    try {
      await schema.validate(
        {
          amount,
        },
        { abortEarly: false }
      );
      setValidationErrors({});
      // if validation is successful, send a withdrawal request to the server
      try {
        const response = await withdrawAction(amount, accountId);
        if (response.status === "success") {
          toast.success("Withdrawal request sent");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);

        toast.error("Something went wrong");
      }
    } catch (error) {
      const errors: FormErrors = {};
      error.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
      return;
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
      {validationErrors && validationErrors.amount && (
        <div style={{ color: "red" }}>{validationErrors.amount}</div>
      )}
      <button
        type="submit"
        className="bg-[#F6D6D6] px-6 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        withdraw
      </button>
    </form>
  );
}
