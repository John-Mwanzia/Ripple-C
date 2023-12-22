"use client";

import { SignIn } from '@/handlers/api';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from './Loader';
import { Store } from '@/contexts/store';

export default function Form() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);

    const { token } = state;

    useEffect(() => {
      // revoke access to sign in page if user is already logged in
      if (token) {
        router.push("/");
      }
    }, [token]);


    const router = useRouter()

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            phoneNumber,
            password
        }

        try {
            setIsLoading(true);
            const response = await SignIn(data);
            setIsLoading(false);
      
            if (response && response.token) {
              // Handle successful login
              ctxDispatch({ type: "LOGIN", payload: response.token });
              toast.success('Login successful');
              router.push('/');
            } else {
              // Handle invalid response or missing token
              toast.error('Invalid response');
            }
          } catch (error) {
            console.log(error); // Log the error for debugging
            toast.error('Error occurred during login');
          }

      
        
        
      };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="mt-1">
        <input
          name="phoneNumber"
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="appearance-none block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1">
        <input
          id="password"
          name="password"
          type="password"
            onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div className="flex items-center text-sm gap-2">
      <p className="text-black">Don't have an accout?</p>
      <Link
        href="/sign-up"
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Sign up
      </Link>
    </div>

    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? <Loader width={25} height={25} />
         : 'Sign in'}
      </button>
    </div>
  </form>
  )
}
