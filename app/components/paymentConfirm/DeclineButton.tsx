"use client";

import React from "react";

export default function DeclineButton() {
  const handleDecline = async () => {};
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
      onClick={handleDecline}
    >
      Decline
    </button>
  );
}
