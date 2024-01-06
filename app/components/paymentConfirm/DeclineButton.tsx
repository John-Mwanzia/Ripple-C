"use client";

import { declinePayment } from "@/handlers/api";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

export default function DeclineButton({ userId, id }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleDecline = async () => {
    // Alert user if they are sure they want to decline payment or not
    const confirm = window.confirm("Are you sure you want to decline payment?");
    if (!confirm) return;

    // Send request to decline payment
    setLoading(true);
    const res = await declinePayment(userId, id);
    setLoading(false);

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
      disabled={loading}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
      onClick={handleDecline}
    >
      {loading ? <Loader width={20} height={20} /> : "Decline"}
    </button>
  );
}
