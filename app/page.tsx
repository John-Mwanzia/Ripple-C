'use client';
import Image from 'next/image'
import React, {  useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { log } from 'console';


export default function page() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    
    if(!token) {
      router.push('/sign-in');
    }

  }, [])
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  }
  return (
    <div>
      <div className='flex justify-around'>
        <div>
          <Image
            className='mx-auto  w-auto'
            src='/Logo.png'
            alt='logo'
            width={200}
            height={100}
          />
        </div>
        <div>
          {/* <UserButton /> */}
        </div>
      </div>
    </div>
  )
}
