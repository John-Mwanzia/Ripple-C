"use server";

import { sendMail } from "@/lib/mail";
import prisma from "@/modules/db";
import { NextResponse } from "next/server";

const formAction = async (
  formData: FormData,
  phoneNumber: string,
  amount: number
) => {
  const mpesaCode = formData.get("MpesaCode");

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
    include: {
      accounts: {
        include: {
          Transaction: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = user.accounts[0];

  if (!account) {
    throw new Error("Account not found");
  }

  const recentTransaction = account.Transaction[0];

  if (!recentTransaction) {
    throw new Error("Transaction not found");
  }

  // Fetch the transaction associated with the account
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: recentTransaction.id,
      },
      data: {
        mpesaCode: mpesaCode as string,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    //SEND AN EMAIL TO ADMIN WITH THE TRANSACTION DETAILS

    await sendMail({
      to: "jmwanzia@kabarak.ac.ke",
      name: "Ripple Cash",
      subject: "New Transaction",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="text-align: center; color: #333;">New Transaction</h1>
          <p style="color: #555;">Name: ${user.firstName}</p>
          <p style="color: #555;">Amount: ${amount}</p>
          <p style="color: #555;">Mpesa Code: ${mpesaCode}</p>
          <p style="color: #555;">Phone Number: ${phoneNumber}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://ripple-cash.vercel.app/admin/6587480a1b6987f0bc456b1e/paymentConfirm/${user.id}" style="text-decoration: none; padding: 10px 20px; background-color: #3498db; color: white; border-radius: 5px;">Confirm</a>
          </div>
        </div>
      `,
    });

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export default formAction;
