"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { SignUp } from "@/handlers/api";
import { Store } from "@/contexts/store";
import Loader from "./Loader";

const generateReferralCode = () => {
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7);
  return randomString.toUpperCase();
};

interface FormErrors {
  phoneNumber?: string;
  firstName?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

export default function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [referrerCode, setReferrerCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token } = state;

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^(07|01)\d{8}$/, {
        message: "Phone number must start with 07 or 01",
        excludeEmptyString: true, // Exclude error if field is empty
      })
      .matches(/^\d{10}$/, {
        message: "Phone number must be 10 digits",
        excludeEmptyString: true, // Exclude error if field is empty
      })
      .label("Phone Number"),
    firstName: Yup.string().required("First name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  useEffect(() => {
    // revoke access to sign in page if user is already logged in
    if (token) {
      router.push("/");
    }
  }, [token]);

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const providedReferralCode = urlParams.get("referralCode");
    setReferrerCode(providedReferralCode);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const referralCode = generateReferralCode();

    const data = {
      phoneNumber,
      firstName,
      password,
      referralCode,
      referrer: referrerCode || "",
    };

    try {
      await validationSchema.validate(
        {
          phoneNumber,
          firstName,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      // If validation succeeds, proceed with your form submission logic
      // also remove any existing validation errors
      setValidationErrors({});
      //  make the API request

      try {
        setIsLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const providedReferralCode = urlParams.get("referralCode");
        setReferrerCode(providedReferralCode);
        console.log(referrerCode);

        const response = await SignUp(data);
        setIsLoading(false);

        if (response && response.token) {
          // Handle successful login
          ctxDispatch({ type: "LOGIN", payload: response.token });
          toast.success("Login successful");
          router.push("/");
        } else {
          // Handle invalid response or missing token
          toast.error("Invalid response");
        }
      } catch (error) {
        toast.error("Error occurred during login");
      }
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setValidationErrors(formattedErrors);
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
        {validationErrors && validationErrors.phoneNumber && (
          <div style={{ color: "red" }}>{validationErrors.phoneNumber}</div>
        )}
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
        {validationErrors && validationErrors.firstName && (
          <div style={{ color: "red" }}>{validationErrors.firstName}</div>
        )}
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
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {validationErrors && validationErrors.password && (
          <div style={{ color: "red" }}>{validationErrors.password}</div>
        )}
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
        {validationErrors && validationErrors.confirmPassword && (
          <div style={{ color: "red" }}>{validationErrors.confirmPassword}</div>
        )}
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
          {isLoading ? <Loader width={25} height={25} /> : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
