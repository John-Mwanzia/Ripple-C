"use client";

import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { withdrawConfirm } from "@/handlers/api";

export default function ConfirmWithdraw({ withdrawId }) {
  const router = useRouter();
  const handleConfirm = async () => {
    // Alert user if they are sure they want to confirm payment or not
    const confirm = window.confirm(
      "Are you sure you want to confirm Withdraw?"
    );
    if (!confirm) return;

    // Send request to confirm payment
    const res = await withdrawConfirm(withdrawId);
    console.log(res);

    // If there is an error, alert the user
    if (res.status === "error") {
      return toast.error(res.message);
    }

    // If there is no error, alert the user and redirect them to the home page
    toast.success("withdraw confirmed successfully");
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
