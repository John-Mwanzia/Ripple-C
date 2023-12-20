'use client';
import Image from 'next/image'
import React, {  useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { decode } from 'punycode';


export default function page() {
  const [decodedToken, setDecodedToken] = React.useState(null);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    setDecodedToken(decodedToken);
    
    
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
          { decodedToken && <h1 className='text-white dark:text-black'>{decodedToken.firstName}</h1>}
        </div>
      </div>
    </div>
  )
}
