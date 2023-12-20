import { newUserActions } from "@/actions/serverActions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignUpForm from "../components/SignUpForm";

export default function page() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg pb-12 sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-16">
              <Image
                className="mx-auto  w-auto"
                src="/Logo.png"
                alt="logo"
                width={200}
                height={100}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}
