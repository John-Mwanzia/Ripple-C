import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col mx-auto  sm:flex-row sm:w-[80%]  ">
      <div className="border-b border-gray-300">
        <Image
          className="mx-auto  w-full sm:w-[40%] sm:mt-12 "
          src="/team.jpg"
          alt="logo"
          width={200}
          height={100}
        />
      </div>
      <div className="mt-4 px-2 sm:max-w-2xl sm:mt-20">
        <h2 className="text-2xl font-semibold ">
          {" "}
          <span className="whitespace-nowrap">
            {" "}
            Unite and Prosper! Embrace
          </span>{" "}
          Success Together!
        </h2>
        <h3 className="mt-3">
          <span className="text-orange-400 text-lg">
            Extend Invitations, Earn
          </span>{" "}
          Credits, and Jam with Your Team as{" "}
          <span className="text-green-500 text-lg"> Triumph</span> becomes a
          Collective Journey.
        </h3>
      </div>
    </div>
  );
}
