import { DataTable } from "@/app/components/admin/data-table";
import prisma from "@/modules/db";
import Image from "next/image";
import React from "react";
import { columns } from "./columns";

export default async function page({ params }) {
  // this id is only for showing a welcome message  to the admin
  const { id } = params;
  // fetch the admin firstname and display it in a welcome message
  const admin = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  //   fetch every collection and display them in a table

  const response = await prisma.user.findMany({
    include: {
      Account: {
        include: {
          Transaction: true,
        },
      },
      investments: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className=" min-h-screen">
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold ">Welcome Admin {admin.firstName}</h1>

        <DataTable columns={columns} data={response} />
      </div>
    </div>
  );
}
