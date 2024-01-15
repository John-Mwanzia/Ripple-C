"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function InviteCard({ decodedToken }) {
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

  const copyToClipboard = (text, setCopySuccess) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Reset the copy success message after 2 seconds
      },
      (err) => {
        console.error("Could not copy: ", err);
      }
    );
  };

  return (
    <div className="px-6 mt-8">
      <div className="bg-[#d896ff]  relative  text-center px-4 sm:px-12 py-8 sm:py-20 rounded-3xl shadow-xl">
        <h3 className="flex gap-3 pl-4 justify-start items-center  pb-4">
          <span className="font-medium">Your code :</span>
          <span className="text-sm">
            {decodedToken && decodedToken.referralCode}
          </span>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() =>
                copyToClipboard(
                  decodedToken && decodedToken.referralCode,
                  setCopyCodeSuccess
                )
              }
              className="flex-1 flex justify-end relative"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1621/1621635.png"
                alt="copy"
                width={20}
                height={20}
              />
              {copyCodeSuccess && (
                <span
                  style={{ color: "green" }}
                  className="absolute -top-8 -right-4"
                >
                  Code Copied!
                </span>
              )}
            </button>
          </div>
        </h3>
        <div className="flex gap-1 justify-start pl-4  items-center ">
          <span className="font-medium">Link :</span>
          <span className="text-sm">https://tradvow-company....</span>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() =>
                copyToClipboard(
                  "https://tradvow-company.vercel.app/sign-up?referralCode=" +
                    decodedToken.referralCode,

                  setCopyLinkSuccess
                )
              }
              className=" relative"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1621/1621635.png"
                alt="copy"
                width={20}
                height={20}
              />
              {copyLinkSuccess && (
                <span
                  style={{ color: "green", whiteSpace: "nowrap" }}
                  className="absolute -top-6 -left-12  z-50"
                >
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
