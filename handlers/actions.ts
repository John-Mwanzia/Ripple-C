"use server";

import { sendMail } from "@/lib/mail";
import prisma from "@/modules/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const formAction = async (
  formData: FormData,
  phoneNumber: string,
  amount: number,
  paymentId: string
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

  // use transactionId to fetch the transaction instead of always using the first one
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  // Fetch the transaction associated with the account
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: paymentId,
      },
      data: {
        mpesaCode: mpesaCode as string,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    //SEND AN EMAIL TO ADMIN WITH THE TRANSACTION DETAILS
    const combinedIds = `${user.id}-${paymentId}`;
    const link = `https://tradvow-company.vercel.app/admin/6599decbdf95a66e14fe5fa8/paymentConfirm/${combinedIds}`;

    await sendMail({
      to: "dorcasnzioka481@gmail.com",

      name: "Tradvow Company",
      subject: "New Recharge Transaction",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="text-align: center; color: #333;">New Transaction</h1>
          <p style="color: #555;">Name: ${user.firstName}</p>
          <p style="color: #555;">Amount: ${amount}</p>
          <p style="color: #555;">Mpesa Code: ${mpesaCode}</p>
          <p style="color: #555;">Phone Number: ${phoneNumber}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${link}" style="background-color: #333; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Confirm Payment</a>
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

const withdrawAction = async (amount, accountId, investments, userId) => {
  // charge 10% fee
  const fee = amount * 0.1;
  const amountAfterFee = amount - fee; // send an email to admin with the transaction details

  // Check if the user has investments
  if (!investments || investments.length === 0) {
    return {
      status: "error",
      message: "You need to have an active investment plan to withdraw.",
    };
  }

  if (amount < 350) {
    return {
      status: "error",
      message: "You cannot withdraw less than Ksh. 350.",
    };
  }

  // Make request to backend

  // get the account balance to check if the user has enough balance to withdraw
  // if not return an error

  try {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    if (account.balance < amount) {
      return {
        status: "error",
        message: "You do not have enough balance to withdraw.",
      };
    }
  } catch (error) {
    // Handle error
    console.error(error);
    return {
      status: "error",
      message: error.message,
    };
  }

  // transaction type = WITHDRAW

  try {
    const withdraw = await prisma.transaction.create({
      data: {
        amount,
        type: "WITHDRAWAL",
        status: "PENDING",
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });

    // deduct amount from account balance

    try {
      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
        },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      const newBalance = account.balance - amount;

      await prisma.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: newBalance,
        },
      });
    } catch (error) {
      // Handle error
      console.error(error);
      return {
        status: "error",
        message: error.message,
      };
    }

    if (!withdraw) {
      throw new Error("Transaction not found");
    }

    //SEND AN EMAIL TO ADMIN WITH THE TRANSACTION DETAILS

    await sendMail({
      to: "dorcasnzioka481@gmail.com",

      name: "Tradvow Company",
      subject: "New Withdrawal Request",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="text-align: center; color: #333;">New Withdrawal Request</h1>
          <p style="color: #555;">Amount: ${amount}</p>
          <p style="color: #555;">Fee: ${fee}</p>
          <p style="color: #555;">Amount After Fee: ${amountAfterFee}</p>
          <p style="color: #555;">Account Id: ${accountId}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://tradvow-company.vercel.app/admin/6599decbdf95a66e14fe5fa8/withdrawConfirm/${withdraw.id}" style="background-color: #333; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Confirm Withdrawal</a>

        </div>
      `,
    });
    revalidatePath(`/wallet/withdraw/${userId}`);

    return {
      status: "success",
    };
  } catch (error) {
    // Handle error
    console.error(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export default formAction;
export { withdrawAction };
