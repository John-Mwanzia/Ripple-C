"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BottomNav from "./components/BottomNav";

export default function page() {
  const [decodedToken, setDecodedToken] = React.useState(null);
  const router = useRouter();

  const getAvatarFallback = () => {
    if (decodedToken && decodedToken.name) {
      return decodedToken.name.charAt(0).toUpperCase();
    }
    return ""; // Or any other default character you want to display
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;

    if (token) {
      const decodedToken = jwtDecode(token);
      setDecodedToken(decodedToken);
    } else {
      router.push("/sign-in");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center    items-center">
        <div className="w-[90%] xl:w-[80%] flex justify-center border-b border-gray-200  ">
          <div>
            <Image
              className="mx-auto w-32 h-20 sm:w-48 sm:h-24"
              src="/Logo.png"
              alt="logo"
              width={200}
              height={100}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <div>
                    <div className=" flex items-center gap-4 mb-4 border-b border-gray-200 pb-3 ">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="avatar"
                            width={40}
                            height={40}
                          />
                          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                        </Avatar>
                      </div>

                      <div>
                        <p className=" text-gray-800  font-semibold">
                          {decodedToken && decodedToken.name}
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center gap-4 border-b border-gray-200 pb-3  ">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/126/126341.png"
                        alt="phone number"
                        width={20}
                        height={20}
                      />
                      <p className=" text-gray-800 font-semibold">
                        {decodedToken && decodedToken.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 flex items-center gap-4 mt-4 rounded-md hover:bg-gray-200 hover:text-gray-800"
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/992/992680.png"
                      alt="logout"
                      width={20}
                      height={20}
                    />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
