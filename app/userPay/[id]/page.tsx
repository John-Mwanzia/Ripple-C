import React, { useState } from "react";
import Image from "next/image";

import Details from "@/app/components/userpay/Details";
import prisma from "@/modules/db";

export default async function page({ params }) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

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
      <Details firstName={user.firstName} phoneNumber={user.phoneNumber} />

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
