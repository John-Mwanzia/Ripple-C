"use client";

import React, { useState } from "react";

export default function FormField() {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount);
  };
  return (
    <form action="" className="mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="">Amount</label>
        <input
          type="number"
          className="border px-2 py-1 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={amount}
          onChange={(e) => setAmount((e.target.value as unknown) as number)}
          inputMode="numeric"
        />
      </div>
      {/* create selectors of amount which when clicked(state amount) the amount is set as the value of input */}
      <div className="flex gap-2 overflow-x-hidden flex-wrap mt-4 ">
        <button
          onClick={() => setAmount(800)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          800
        </button>
        <button
          onClick={() => setAmount(1600)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          1600
        </button>
        <button
          onClick={() => setAmount(2000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          2000
        </button>
        <button
          onClick={() => setAmount(5000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          5000
        </button>
        <button
          onClick={() => setAmount(10000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          10000
        </button>
        <button
          onClick={() => setAmount(12000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          12000
        </button>
        <button
          onClick={() => setAmount(15000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          15000
        </button>
        <button
          onClick={() => setAmount(20000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          20000
        </button>
        <button
          onClick={() => setAmount(25000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          25000
        </button>
        <button
          onClick={() => setAmount(30000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          30000
        </button>
        <button
          onClick={() => setAmount(40000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          40000
        </button>
        <button
          onClick={() => setAmount(50000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          50000
        </button>
        <button
          onClick={() => setAmount(80000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          80000
        </button>
        <button
          onClick={() => setAmount(100000)}
          className="bg-[#E95514]/80 px-4 py-1 rounded-lg"
        >
          100000
        </button>
      </div>
      <button
        type="submit"
        className="bg-[#F6D6D6] px-4 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        Recharge
      </button>
    </form>
  );
}
