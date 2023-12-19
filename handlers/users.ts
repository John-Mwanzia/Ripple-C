import { comparePassword, generateToken } from "@/modules/auth";
import prisma from "@/modules/db";

export const signIn = async ({ phoneNumber, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  const token = generateToken(user);
  return token;
};
