"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const pathArray =
  typeof window !== "undefined" ? window.location.pathname.split("/") : [];
const adminId = pathArray[pathArray.length - 1];

export type User = {
  id: string;
  firstName: string;
  phoneNumber: string;
  Account: {
    balance: number;
    Transaction: {
      id: string;
      status: string;
      amount: number;
      createdAt: Date;
    }[];
  }[];
  investments: {
    product: {
      productName: string;
      productImage: string;
      dailyIncome: number;
    };
    amount: number;
  }[];
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown
            className={`h-4 w-4 ${
              column.getIsSorted() ? "text-gray-900" : "text-gray-400"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.firstName}</span>,
  },

  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
          <ArrowUpDown
            className={`h-4 w-4 ${
              column.getIsSorted() ? "text-gray-900" : "text-gray-400"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
  },
  {
    accessorKey: "balance",
    header: () => <span>Account Balance</span>,
    cell: ({ row }) => (
      <span>{row.original.Account[0].balance.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "investmentsLength",
    header: () => <span>Investments</span>,
    cell: ({ row }) => <span>{row.original.investments.length}</span>,
  },
  {
    accessorKey: "transactionsLength",
    header: () => <span>Transactions</span>,
    cell: ({ row }) => (
      <span>{row.original.Account[0].Transaction.length}</span>
    ),
  },
  {
    accessorKey: "totalInvestmentAmount",
    header: () => <span>Total Investment Amount</span>,
    cell: ({ row }) =>
      row.original.investments
        .reduce((acc, investment) => acc + investment.amount, 0)
        .toFixed(2),
  },
  {
    accessorKey: "totalDailyIncome",
    header: () => <span>Total Daily Income</span>,
    cell: ({ row }) =>
      row.original.investments
        .reduce((acc, investment) => acc + investment.product.dailyIncome, 0)
        .toFixed(2),
  },
  {
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/${adminId}/user/${user.id}`}>
                View user details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
