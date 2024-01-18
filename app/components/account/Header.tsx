"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ user }) {
  const getAvatarFallback = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return ""; // Or any other default character you want to display
  };
  return (
    <div className="flex justify-between px-4">
      <div className="absolute top-6 text-white text-xl font-bold">
        {user && user.phoneNumber}
      </div>
      <div className="absolute top-20 text-black px-3  font-bold">
        <span>
          <strong>Recomended Code : </strong>
        </span>
        {user && user.referralCode}
      </div>
      <div className="absolute top-4 right-4">
        <Avatar>
          <AvatarImage
            src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            alt="avatar"
            width={40}
            height={40}
          />
          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
