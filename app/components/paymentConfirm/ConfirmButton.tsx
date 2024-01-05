"use client";

import { paymentConfirm } from "@/handlers/api";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ConfirmButton({ userId, amount, id }) {
  const router = useRouter();
  const handleConfirm = async () => {
    // Alert user if they are sure they want to confirm payment or not
    const confirm = window.confirm("Are you sure you want to confirm payment?");
    if (!confirm) return;

    // Send request to confirm payment

    const res = await paymentConfirm(userId, amount, id);

    // If there is an error, alert the user
    if (res.status === "error") {
      return toast.error(res.message);
    }

    // If there is no error, alert the user and redirect them to the home page
    toast.success("Payment confirmed successfully");
    router.push("/");
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleConfirm}
    >
      Confirm
    </button>
  );
}
