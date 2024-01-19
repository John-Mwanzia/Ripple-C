import prisma from "@/modules/db";
import { NextResponse } from "next/server";

async function updateTransactionStatus(id: string, status) {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return updatedTransaction;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateAccountBalance(id: string, amount) {
  try {
    const updatedAccount = await prisma.account.update({
      where: {
        id,
      },
      data: {
        balance: amount,
      },
    });
    return updatedAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const POST = async (req: Request, res: Response) => {
  const { userId, amount, id } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Account: {
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
    return NextResponse.json({ status: "error", message: "User not found" });
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
  });

  if (transaction.status === "COMPLETED") {
    return NextResponse.json({
      status: "error",
      message: "Payment already confirmed",
    });
  }
  // check if it already failed
  if (transaction.status === "FAILED") {
    return NextResponse.json({
      status: "error",
      message: "Payment already declined",
    });
  }

  if (transaction.amount !== amount) {
    return NextResponse.json({
      status: "error",
      message: "Amount does not match",
    });
  }

  const acccount = user.Account[0];

  try {
    // this invite revenue will be awarded to the referrer(10%) and the secondary referrer(4%) to the current user
    // but this revenue is only awarded when the current user successfully his payment is completed and
    // on the only the first completed transaction, those other consecutive payments no one will be awarded invite revenue

    // check if there is any other first transaction that has been completed by the user or assign this transaction as the first completed transaction
    const firstCompletedTransaction = await prisma.transaction.findFirst({
      where: {
        accountId: acccount.id,
        status: "COMPLETED",
        type: "RECHARGE",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // if there is no other completed transaction then this transaction will be the first completed transaction
    if (!firstCompletedTransaction) {
      // check if the user has a referrer
      if (user.referrerId) {
        // get the referrer
        const referrer = await prisma.user.findUnique({
          where: {
            id: user.referrerId,
          },
          include: {
            Account: {
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

        // award the referrer 10% of the amount of the transaction to the account and also the invite revenue of the referrer will be updated
        const updatedReferrerAccount = await prisma.account.update({
          where: {
            id: referrer.Account[0].id,
          },
          data: {
            balance: {
              increment: amount * 0.15,
            },
          },
        });

        const updatedReferrer = await prisma.user.update({
          where: {
            id: referrer.id,
          },
          data: {
            inviteRevenue: {
              increment: amount * 0.15,
            },
          },
        });

        // check if the referrer has a secondary referrer
        //   if (referrer.referrerId) {
        //     // get the secondary referrer
        //     const secondaryReferrer = await prisma.user.findUnique({
        //       where: {
        //         id: referrer.referrerId,
        //       },
        //       include: {
        //         Account: {
        //           include: {
        //             Transaction: {
        //               orderBy: {
        //                 createdAt: "desc",
        //               },
        //             },
        //           },
        //         },
        //       },
        //     });

        //     // award the secondary referrer 4% of the amount of the transaction to the account
        //     // and also the invite revenue of the secondary referrer will be updated
        //     const updatedSecondaryReferrerAccount = await prisma.account.update({
        //       where: {
        //         id: secondaryReferrer.Account[0].id,
        //       },
        //       data: {
        //         balance: {
        //           increment: amount * 0.04,
        //         },
        //       },
        //     });

        //     const updatedSecondaryReferrer = await prisma.user.update({
        //       where: {
        //         id: secondaryReferrer.id,
        //       },
        //       data: {
        //         inviteRevenue: {
        //           increment: amount * 0.04,
        //         },
        //       },
        //     });
        //   }
      }
    }

    // if there is another completed transaction, this transaction will not be the first completed transaction,
    // and no one will be awarded invite revenue, just continue

    if (firstCompletedTransaction) {
      console.log("there is another completed transaction");
    }

    // update transaction status
    // Now proceed with updating transaction status and user account balance
    const updatedTransaction = await updateTransactionStatus(id, "COMPLETED");

    const updatedAccount = await updateAccountBalance(
      acccount.id,
      acccount.balance + amount
    );
  } catch (error) {
    // Handle errors here (e.g., log them, send error response, etc.)
    console.error("Error occurred:", error);
    // Respond with an error message if needed
    return NextResponse.json({ status: "error", message: "An error occurred" });
  }
  // Continue with the rest of the code or respond with success message
  return NextResponse.json({ status: "success", message: "Payment confirmed" });
};
