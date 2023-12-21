import React from "react";
import BottomNav from "../components/BottomNav";
import Banner from "../components/Banner";
import Image from "next/image";
import InviteRules from "../components/InviteRules";
import InviteCard from "../components/InviteCard";
import Link from "next/link";

export default function page() {
  
  
  return (
    <div className="pb-20">
      <Banner />
      <InviteRules />
      <InviteCard />
      <div className="mt-8 flex justify-center px-4 ">
        <Link href="/team/team-members" className=" flex-1 text-center  py-2 lg:py-3  bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-3xl text-xl ">
          View team members
        </Link>
      </div>
      <BottomNav />
    </div>
  );
}
