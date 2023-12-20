

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import Form from "../components/LoginForm";

export default function page() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center bg-zinc-100/50  sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg pb-12 sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-16">
              <Image
                className="mx-auto  w-auto"
                src="/Logo.png"
                alt="logo"
                width={200}
                height={100}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
