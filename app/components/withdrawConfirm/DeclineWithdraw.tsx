"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { withdrawDecline } from "@/handlers/api";
import Loader from "../Loader";

export default function DeclineWithdraw({ userId, withdrawId, amount }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDecline = async () => {
    // Alert user if they are sure they want to decline payment or not
    const confirm = window.confirm(
      "Are you sure you want to decline withdraw?"
    );
    if (!confirm) return;

    // Send request to decline payment
    setLoading(true);
    const res = await withdrawDecline(userId, withdrawId, amount);
    setLoading(false);

    // If there is an error, alert the user
    if (res.status === "error") {
      return toast.error(res.message);
    }

    // If there is no error, alert the user and redirect them to the home page
    toast.success("Withdraw declined successfully");
    router.push("/");
  };
  return (
    <button
      disabled={loading}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
      onClick={handleDecline}
    >
      {loading ? <Loader width={20} height={20} /> : "Decline"}
    </button>
  );
}
