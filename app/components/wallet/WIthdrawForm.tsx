"use client";

import { withdrawAction } from "@/handlers/actions";
import React, { use, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Button from "../Button";
import { error } from "console";

interface FormErrors {
  amount?: string;
  [key: string]: string | undefined;
}

export default function WIthdrawForm({ balance, accountId, investments }) {
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const ref = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleWithdraw = async (formData: FormData) => {
    ref.current.reset();
    const amount = Number(formData.get("amount"));
    if (amount < 200) {
      // Handle error
      toast.error("Minimum withdrawal amount is Ksh: 200");
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
        const response = await withdrawAction(amount, accountId, investments);
        if (response.status === "success") {
          toast.success("Withdrawal request sent");
          router.push("/account");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
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
    <form ref={ref} action={handleWithdraw}>
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
      <Button />
    </form>
  );
}
