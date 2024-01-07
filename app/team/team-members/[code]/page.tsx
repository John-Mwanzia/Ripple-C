import BottomNav from "@/app/components/BottomNav";
import prisma from "@/modules/db";
import React from "react";
import { Badge } from "@/components/ui/badge";

export default async function page({ params }) {
  const response = await prisma.user.findUnique({
    where: {
      referralCode: params.code,
    },
    include: {
      referrer: true,
      referee: true,
      secondaryReferees: true, // Include secondary referrals
    },
  });

  return (
    <div>
      <div className="w-full bg-[#9A031E]/70 py-4">
        <h1 className="text-center text-white font-semibold">Referral Tree</h1>
      </div>

      {/* Referrer */}
      {response.referrer && (
        <Badge variant="outline" className="w-full">
          <div className="flex gap-3 items-center justify-between">
            <h3 className="font-semibold text-xl">Referrer</h3>
            <div className="flex flex-col">
              <p className="">{response.referrer.firstName}</p>
              <p>{response.referrer.phoneNumber}</p>
            </div>
          </div>
        </Badge>
      )}

      {/* Primary Referrals */}
      <h1 className="text-center mt-6 mb-4">
        Primary Referrals ({response.referee.length})
      </h1>
      <div className="flex flex-col gap-4">
        {response.referee.map((referee) => (
          <Badge key={referee.id} variant="default" className="w-[80%] mx-auto">
            <div className="flex gap-3 justify-center items-center">
              <h3 className="font-semibold text-xl">{referee.firstName}</h3>
              <div className="flex flex-col">
                {/* <p>{referee.phoneNumber}</p> */}
                <p>Referral Code: {referee.referralCode}</p>
                {/* Calculate and display potential earnings here */}
              </div>
            </div>
          </Badge>
        ))}
      </div>

      {/* Secondary Referrals */}
      <h1 className="text-center mt-6 mb-4">
        Secondary Referrals ({response.secondaryReferees.length})
      </h1>
      <div className="flex flex-col gap-4">
        {response.secondaryReferees.map((secondaryReferee) => (
          <Badge
            key={secondaryReferee.id}
            variant="secondary"
            className="w-[80%] mx-auto"
          >
            <div className="flex  gap-3 justify-center items-center">
              <h3 className="font-semibold text-xl">
                {secondaryReferee.firstName}
              </h3>
              <div className="flex flex-col">
                {/* <p>{secondaryReferee.phoneNumber}</p> */}
                <p>Referral Code: {secondaryReferee.referralCode}</p>
                {/* Calculate and display potential earnings here */}
              </div>
            </div>
          </Badge>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
