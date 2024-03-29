"use client";

import React, { useContext, useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Image from "next/image";
import Header from "../components/account/Header";
import { Store } from "@/contexts/store";
import { getUserData } from "@/handlers/api";
import Loader from "../components/Loader";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function page() {
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token } = state;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as MyDecodedToken;

      const fetchData = async () => {
        try {
          setisLoading(true);

          // Fetch user data
          const response = await getUserData({
            phoneNumber: decodedToken.phoneNumber,
          });

          // Once data is fetched, set it in state
          setUserData(response.data);

          setisLoading(false);
        } catch (error) {
          // Handle errors if needed
          console.error(error);
          setisLoading(false);
        }
      };

      fetchData();
    }
  }, [token]);

  return (
    <div className="relative bg-[#5182EF]/70 h-screen  ">
      {isLoading ? (
        <div className=" w-screen h-screen flex justify-center items-center">
          <Loader width={50} height={50} />
        </div>
      ) : (
        <>
          <Header user={userData} />
          <div className=" px-4">
            <h2 className="text-black text-xl font-bold">
              Account Balance : Ksh: {userData && userData.Account[0].balance}
            </h2>
          </div>
          {/* <div>
            <Image
              src="/photon.svg"
              alt="loading"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div> */}

          <div className="flex justify-between px-4 mt-8">
            <div className="bg-zinc-100 shadow-lg  px-6 py-2 rounded-lg">
              <Link
                href={`/wallet/recharge/${userData && userData.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src="https://cdn2.iconfinder.com/data/icons/dollar-7/64/dollar_money-15-512.png"
                  alt="recharge"
                  width={30}
                  height={30}
                  className=""
                />
                Recharge
              </Link>
            </div>
            <div className="bg-zinc-100 shadow-lg  px-6 py-2 rounded-lg">
              <Link
                href={`/wallet/withdraw/${userData && userData.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/10167/10167710.png"
                  alt="withdraw"
                  width={30}
                  height={30}
                  className=""
                />
                Withdraw
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <div className="px-4 border-b-2 border-gray-200 pb-2 mt-4">
              <Link
                href={`/recharge-history/${userData && userData.id}`}
                className="text-black flex justify-between  font-bold"
              >
                <h2>Recharge logs</h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/709/709586.png"
                  alt="right arrow"
                  width={15}
                  height={6}
                  className=""
                />
              </Link>
            </div>
            <div className="px-4 border-b-2 border-gray-200 pb-2 mt-4">
              <Link
                href={`/withdraw-history/${userData && userData.id}`}
                className="text-black flex justify-between  font-bold"
              >
                <h2>Withdraw logs</h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/709/709586.png"
                  alt="right arrow"
                  width={15}
                  height={6}
                  className=""
                />
              </Link>
            </div>
            <div className="px-4 border-b-2 border-gray-200 pb-2 mt-4">
              <Link
                href={`/invite-revenue/${userData && userData.id}`}
                className="text-black flex justify-between  font-bold"
              >
                <h2>Invite revenue</h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/709/709586.png"
                  alt="right arrow"
                  width={15}
                  height={6}
                  className=""
                />
              </Link>
            </div>
            <div className="px-4 border-b-2 border-gray-200 pb-2 mt-4">
              <Link
                href="/about-us"
                className="text-black flex justify-between  font-bold"
              >
                <h2>About Us</h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/709/709586.png"
                  alt="right arrow"
                  width={15}
                  height={6}
                  className=""
                />
              </Link>
            </div>
          </div>
          <BottomNav />
        </>
      )}
    </div>
  );
}
