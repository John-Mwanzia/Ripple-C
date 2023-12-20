import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BottomNav() {
  return (
    <div className="w-screen fixed bottom-0 bg-[#F0C113]/80 py-4">
      <div className="flex justify-around">
        <div>
          <Link href="/">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
              alt="home"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div>
          <Link href="/team">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/681/681494.png"
              alt="team"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div>
          <Link href="/account">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
              alt="Account"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
