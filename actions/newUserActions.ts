// use server actions to create a new user

// Path: actions/newUserActions.ts
import prisma from "../modules/db";
import { hashPassword } from "../modules/auth";
import { NextApiRequest, NextApiResponse } from "next";


// create a new user

const newUserActions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNumber, firstName, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        firstName,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};