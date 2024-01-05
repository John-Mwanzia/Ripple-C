"use client";

import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserPayForm from "./UserPayForm";
import { useSearchParams } from "next/navigation";

export default function Details({ firstName, phoneNumber }) {
  const [copyAmoutSuccess, setCopyAmountSuccess] = useState(false);
  const [copySendToSuccess, setCopySendToSuccess] = useState(false);
  const [copyPhoneSuccess, setCopyPhoneSuccess] = useState(false);

  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const id = searchParams.get("id");
  const amount = searchParams.get("amount");

  const copyToClipboard = (text, setCopySuccess) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(true);
        toast.success(`${text} copied!`, {
          position: "top-center",
          duration: 3000,
        });
      },
      (err) => {
        console.error("Could not copy: ", err);
      }
    );
  };
  return (
    <>
      <div>
        <div className="mt-6 px-4">
          <p>
            OrderId: <span>{transactionId}</span>
          </p>
        </div>
        <div className="flex justify-between px-4 mt-6">
          <p>Pay Amount</p>
          <div className="flex gap-4">
            <p className="font-medium">{amount} KES</p>
            <button
              onClick={() => copyToClipboard(amount, setCopyAmountSuccess)}
              className="relative"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1622/1622069.png"
                alt="copy"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-between px-4 mt-6">
          <p>Pay to</p>
          <div className="flex gap-4">
            <p className="font-medium">Caleb Muthama</p>
            <button
              onClick={() =>
                copyToClipboard("Caleb Muthama", setCopySendToSuccess)
              }
              className="relative"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1622/1622069.png"
                alt="copy"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-between px-4 mt-6">
          <p>Phone Number</p>
          <div className="flex gap-4">
            <p className="font-medium">0796642248</p>
            <button
              onClick={() => copyToClipboard("0796642248", setCopyPhoneSuccess)}
              className="relative"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1622/1622069.png"
                alt="copy"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-44 h-44 bg-zinc-100 ">
          <p className="text-center px-4">i'll add mpesa qr code here</p>
        </div>
      </div>

      <div className="px-4 mt-3">
        <p className="text-red-600">* Transaction id is required</p>
        <p className="text-red-600">
          * Get transaction id from mpesa payment notification SMS
        </p>
      </div>

      <UserPayForm
        firstName={firstName}
        phoneNumber={phoneNumber}
        amount={amount}
        paymentId={id}
      />
    </>
  );
}
