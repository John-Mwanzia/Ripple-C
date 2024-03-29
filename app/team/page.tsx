"use client";

import React, { useContext, useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Banner from "../components/Banner";
import Image from "next/image";
import InviteRules from "../components/InviteRules";
import InviteCard from "../components/InviteCard";
import Link from "next/link";
import { Store } from "@/contexts/store";
import { jwtDecode } from "jwt-decode";

export default function page() {
  const [decodedToken, setDecodedToken] = useState(null);

  const { state } = useContext(Store);
  const { token } = state;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as MyDecodedToken;
      setDecodedToken(decodedToken);
    }
  }, [token]);

  return (
    <div className="pb-20">
      <Banner />
      <InviteRules />
      <InviteCard decodedToken={decodedToken} />
      <div className="mt-8 flex justify-center px-4 ">
        <Link
          href={`/team/team-members/${decodedToken &&
            decodedToken.referralCode}`}
          className=" flex-1 text-center  py-2 lg:py-3  bg-[#FB9678] rounded-xl shadow-lg text-xl "
        >
          View team members
        </Link>
      </div>
      <BottomNav />
    </div>
  );
}
