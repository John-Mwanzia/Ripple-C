"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function page() {
  const [copyAmoutSuccess, setCopyAmountSuccess] = useState(false);
  const [copySendToSuccess, setCopySendToSuccess] = useState(false);
  const [copyPhoneSuccess, setCopyPhoneSuccess] = useState(false);
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId");
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
    <div>
      <div className="bg-[#39B54A] w-full h-1"></div>
      <div className="mt-2 pb-2 border-b border-gray-300">
        <Image
          src="/mpesaLogo.png"
          alt="mpesa logo"
          width={100}
          height={40}
          className="mx-auto"
        />
      </div>
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
            <p className="font-medium">Ripple Kinuthia</p>
            <button
              onClick={() =>
                copyToClipboard("Ripple Kinuthia", setCopySendToSuccess)
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
      {/* dotted border bottom */}
      <form
        action=""
        className="mt-4 pb-6 px-4 border-b border-dotted border-gray-300"
      >
        <input
          type="text"
          placeholder="Transaction id [Eg : RLQ79PM6J]"
          className="border px-2 py-1 rounded-lg outline-none  w-full"
        />

        <button
          type="submit"
          className="bg-[#0FB020]/70 px-4 py-1 rounded-lg mt-4 w-full shadow-md"
        >
          I have made the payment
        </button>
      </form>
      <div className="mt-4 flex px-6 mb-4 ">
        <Image
          src="/scanner.png"
          alt="scanner"
          width={30}
          height={30}
          className="mx-auto"
        />
        <p>Open mpesa [scan]</p>
      </div>
      <div className="bg-[#0FB020]/70 w-full h-16"></div>
    </div>
  );
}
