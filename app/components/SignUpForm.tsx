'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { SignUp } from '@/handlers/api';


export default function SignUpForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
          }

        const data = {
            phoneNumber,
            firstName,
            password,
        }

        try {
            setIsLoading(true);
            const response = await SignUp(data);
            setIsLoading(false);
      
            if (response && response.token) {
              localStorage.setItem('token', JSON.stringify(response.token));
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
          required
            onChange={(e) => setPhoneNumber(e.target.value)}
          className="appearance-none block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        First name
      </label>
      <div className="mt-1">
        <input
          name="firstName"
          type="text"
          required
            onChange={(e) => setFirstName(e.target.value)}
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
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          required
          onChange = {(e)=> setPassword(e.target.value)}
          className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <div className="mt-1">
        <input
          id="password"
          name="password"
          type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div className="flex items-center text-sm gap-2">
      <p className="text-black">Already have an accout?</p>
      <Link
        href="/sign-in"
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Sign in
      </Link>
    </div>

    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign up
      </button>
    </div>
  </form>
  )
}
