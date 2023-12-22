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
    },
  });
  console.log(response);

  return (
    <div>
      <div className="w-full bg-[#9A031E]/70 py-4">
        <h1 className="text-center  text-white font-semibold">Team Members</h1>
      </div>
      <div className=" flex w-screen px-6  mt-4">
        {response && response.referrer && (
          <Badge variant="outline" className=" w-full  ">
            <div className="flex gap-3 justify-center items-center">
              <h3 className="font-semibold text-xl">Referrer</h3>
              <p>
                <span className="">{response.referrer.firstName}</span>
              </p>
              <p>{response.referrer.phoneNumber}</p>
            </div>
          </Badge>
        )}
      </div>
      <div>
        <h1 className="text-center mt-6">
          {response && response.referee ? response.referee.length : 0} Referees
        </h1>
        <div className="flex flex-col gap-4 px-4 mt-4">
          {response &&
            response.referee.map((referee) => (
              <Badge variant="outline" className=" w-full  ">
                <div className="flex gap-3 justify-center items-center">
                  <h3 className="font-semibold text-xl">Referee</h3>
                  <p>
                    <span className="">{referee.firstName}</span>
                  </p>
                  <p>{referee.phoneNumber}</p>
                </div>
              </Badge>
            ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
