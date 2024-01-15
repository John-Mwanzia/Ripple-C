import Image from "next/image";
import React from "react";

export default function InviteRules() {
  return (
    <div className="mt-4">
      <h3 className="text-2xl text-center underline">Invite rules</h3>
      <ul className="px-4 mt-3">
        <li className="flex gap-2 items-start">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/3237/3237420.png"
            alt="diamond"
            width={20}
            height={20}
            // prevent stretch
            className="object-contain "
          />
          <p className="text-sm">
            {" "}
            You will get 15% for any first deposit made by your invitee
          </p>
        </li>
      </ul>
    </div>
  );
}
