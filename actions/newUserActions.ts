// use server actions to create a new user

// Path: actions/newUserActions.ts

'use server';

import prisma from "../modules/db";
import { hashPassword } from "../modules/auth";


// create a new user

const newUserActions = async (formData :FormData) => {

    const phoneNumber =  formData.get("phoneNumber")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const password = formData.get("password")?.toString();


  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        firstName,
        password: hashedPassword,
      },
    });

    return newUser;

  } catch (error) {
    console.log(error);
    return error;
  }
};

export default newUserActions;
