"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { withdrawConfirm } from "@/handlers/api";
import Loader from "../Loader";

export default function ConfirmWithdraw({ withdrawId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleConfirm = async () => {
    // Alert user if they are sure they want to confirm payment or not
    const confirm = window.confirm(
      "Are you sure you want to confirm Withdraw?"
    );
    if (!confirm) return;

    // Send request to confirm payment
    setLoading(true);
    const res = await withdrawConfirm(withdrawId);

    setLoading(false);
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
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleConfirm}
    >
      {loading ? <Loader width={20} height={20} /> : "Confirm"}
    </button>
  );
}
