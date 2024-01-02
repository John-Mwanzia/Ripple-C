"use client";

import { declinePayment } from "@/handlers/api";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeclineButton({ userId }: { userId: string }) {
  const router = useRouter();
  const handleDecline = async () => {
    // Alert user if they are sure they want to decline payment or not
    const confirm = window.confirm("Are you sure you want to decline payment?");
    if (!confirm) return;

    // Send request to decline payment
    const res = await declinePayment(userId);

    // If there is an error, alert the user
    if (res.status === "error") {
      return toast.error(res.message);
    }

    // If there is no error, alert the user and redirect them to the home page
    toast.success("Payment declined successfully");
    router.push("/");
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
      onClick={handleDecline}
    >
      Decline
    </button>
  );
}
