import Image from "next/image";
import React from "react";

export default function InviteCard() {
  return (
    <div className="px-6 mt-8">
      <div className="bg-[#b4e4ff63] relative  transform -skew-x-12 scale-y-100 text-center px-4 sm:px-12 py-8 sm:py-20 rounded-3xl shadow-xl">
        <h3 className=" flex gap-3 pl-4 justify-start items-center skew-x-12 pb-4  ">
          <span className="font-medium">Your code :</span>
          <span className="text-sm">3453</span>
          <button className="flex-1 flex justify-end">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1621/1621635.png"
              alt="copy"
              width={20}
              height={20}
            />
          </button>
        </h3>
        <div className=" flex gap-3 justify-start pl-4 max-w-xs items-center skew-x-12 ">
          <span className="font-medium">Link :</span>
          <span className="text-sm">https://ripple-c.vercel.app/</span>
          <button className="flex-1 flex justify-end">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1621/1621635.png"
              alt="copy"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
