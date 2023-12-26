import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col mx-auto  sm:flex-row sm:w-[80%]  ">
      <Image
        className="mx-auto  w-full sm:w-[40%] sm:mt-12 "
        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="logo"
        width={200}
        height={100}
      />
      <div className="mt-4 px-2 sm:max-w-2xl sm:mt-20">
        <h2 className="text-3xl font-semibold ">
          {" "}
          Together, We Rise! and Thrive!
        </h2>
        <h3 className="mt-3">
          <span className="text-orange-400 text-lg">Invite, Earn</span> Credits,
          and Rock with Your Team as{" "}
          <span className="text-green-500 text-lg"> Success</span> becomes a
          Shared Journey.
        </h3>
      </div>
    </div>
  );
}
