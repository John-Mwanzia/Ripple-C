// i have a project for next js project where users can invest on products and also one user can have  multiple investments. the big issue is there is need for cron-jobs as i have to update the  user account with the totaldaily income(calculated  "   {user.investments.reduce(

import prisma from "@/modules/db";
import { NextResponse } from "next/server";
// import * as ExcelJS from "exceljs";

// (acc, investment) => acc + investment.product.dailyIncome,
0;
//   )}")  and  since i have multiple users i have to to fetch all of them and their specific total daily income as everyone have diferrent daily incomes  and update each user account with specific daily income . this updation occurs after every 24hrs. i have to create an endpoint  that when fired it achieves that please please help

// Path: app/api/dailyIncomeAwarding/route.ts

export const GET = async (req: Request) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Account: true,
        investments: {
          select: {
            id: true,
            product: {
              select: { dailyIncome: true },
            },
          },
        },
      },
    });

    for (const user of users) {
      const totalDailyIncome = user.investments.reduce(
        (acc, investment) => acc + investment.product.dailyIncome,
        0
      );

      // Get the relevant account for the user
      const account = user.Account.find((acc) => acc.userId === user.id);

      if (account) {
        // Update the account balance with the total daily income
        await prisma.account.update({
          where: { id: account.id },
          data: { balance: { increment: totalDailyIncome } }, // Use increment for accurate balance update
        });
      } else {
        console.warn(`No account found for user ${user.id}`);
      }
    }

    // Re-fetch the updated users' data
    const updatedUsers = await prisma.user.findMany({
      include: {
        Account: true,
        investments: {
          select: {
            id: true,
            product: {
              select: { dailyIncome: true },
            },
          },
        },
      },
    });
    // const workbook = new ExcelJS.Workbook();
    // const worksheet = workbook.addWorksheet("Updated Users");

    // // Add column headers
    // worksheet.columns = [
    //   { header: "User ID", key: "id", width: 15 },
    //   { header: "Name", key: "firstName", width: 40 },
    //   // ... other headers as needed
    //   { header: "Account Balance", key: "account.balance", width: 15 },
    // ];

    // // Add rows
    // worksheet.addRows(
    //   updatedUsers.map((user) => [
    //     user.id,
    //     user.firstName,
    //     // ... other data as needed
    //     user.Account[0].balance,
    //   ])
    // );

    // // Generate the file
    // workbook.xlsx
    //   .writeFile("updated_users.xlsx")
    //   .then(() => console.log("Excel file generated successfully"))
    //   .catch((error) => console.error("Error generating Excel file:", error));

    return NextResponse.json({ data: updatedUsers }, { status: 200 });
  } catch (error) {
    console.error("Error updating daily incomes:", error);
    return NextResponse.json(
      { message: "Error updating daily incomes" },
      { status: 500 }
    );
  }
};
