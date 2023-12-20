// use server actions to create a new user

// Path: actions/newUserActions.ts

"use server";

import prisma from "../modules/db";
import { generateToken, hashPassword } from "../modules/auth";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

// import { signIn } from "@/handlers/users";

// create a new user

export const newUserActions = async (formData: FormData) => {
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const firstName = formData.get("firstName")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!phoneNumber || !firstName || !password) {
    // Handle missing values if necessary
    return null;
  }

  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        firstName,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser);

    // set cookie
    setCookie("auth_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return newUser;
     
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("phoneNumber")) {
      // Handle the case where the phone number is already in use
      console.error("Phone number already in use");
      return null;
    } else {
      // Handle other errors
      console.error("Error creating user:", error);
      return error;
    }
  }
};

export const existingUserActions = async (formData: FormData) => {
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!phoneNumber || !password) {
    // Handle missing values if necessary
    return null;
  }
  try {
    const res = await signIn({
      phoneNumber,
      password,
    });

    setCookie("auth_token", res, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });


    // toast.success("Login successful");
  
    return res;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
