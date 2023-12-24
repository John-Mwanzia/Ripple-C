"use client";

import React, { useContext, useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Image from "next/image";
import Header from "../components/account/Header";
import { Store } from "@/contexts/store";
import { jwtDecode } from "jwt-decode";
import { get } from "http";
import { getUserData } from "@/handlers/api";
import Loader from "../components/Loader";
import Link from "next/link";

export default function page() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token } = state;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          setisLoading(true);
          const decodedToken = jwtDecode(token) as MyDecodedToken;
          setDecodedToken(decodedToken);

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
    <div className="relative   ">
      {isLoading ? (
        <div className=" w-screen h-screen flex justify-center items-center">
          <Loader width={50} height={50} />
        </div>
      ) : (
        <>
          <Header user={userData} />
          <div className="absolute top-32 px-6">
            <h2 className="text-black text-xl font-bold">Account Balance :</h2>
            <span className="text-black font-bold">
              Ksh: {userData && userData.Account[0].balance}
            </span>
          </div>
          <div>
            <Image
              src="/photon.svg"
              alt="loading"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-between px-4 mt-8">
            <div className="bg-[#E95514]/80  px-6 py-2 rounded-lg">
              <Link href="/recharge" className="flex flex-col items-center">
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
            <div className="bg-[#E95514]/80  px-6 py-2 rounded-lg">
              <Link href="/withdraw" className="flex flex-col items-center">
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
          <BottomNav />
        </>
      )}
    </div>
  );
}
