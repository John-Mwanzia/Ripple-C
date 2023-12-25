import Image from 'next/image'
import React from 'react'

export default function InviteRules() {
  return (
    <div className="mt-4">
    <h3 className="text-2xl text-center underline">Invitation rules</h3>
    <ul className="px-4 mt-3">
      <li className="flex gap-2">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/408/408472.png"
          alt="diamond"
          width={20}
          height={20}
        />
        <p className="text-sm">
          {" "}
          All new users get Kes 50 when they sign up
        </p>
      </li>
      <li className="flex gap-2">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/408/408472.png"
          alt="diamond"
          width={20}
          height={20}
        />
        <p className="text-sm"> Minimum deposit is KES 800</p>
      </li>
      <li className="flex gap-2 items-start">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/408/408472.png"
          alt="diamond"
          width={20}
          height={20}
          // prevent stretch
          className="object-contain "
        />
        <p className="text-sm">
          {" "}
          The minimum withdrawal amount is KES 100. The withdrawals will be
          processed within 24 hours
        </p>
      </li>
      <li className="flex gap-2 items-start">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/408/408472.png"
          alt="diamond"
          width={20}
          height={20}
          // prevent stretch
          className="object-contain "
        />
        <p className="text-sm">
          {" "}
          You will get 10% for primary referrals and 4% for secondary
          referrals
        </p>
      </li>
     
    </ul>
  </div>
  )
}
