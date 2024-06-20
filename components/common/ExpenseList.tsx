"use client"
import { useState, useEffect, Key } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface resultMap {
  id: number,
  amount: number,
  category: string,
  description: string,
  day: number,
  month: string,
  year: number
}
  
interface DataProps {
  data: []
}

const ExpenseList: React.FC<DataProps> =({ data }) => {
    const bdata = data?.toReversed()

    return (
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Month</TableHead>
          <TableHead className="text-right">Year</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bdata?.map((budget: resultMap, index: number) => (
          <TableRow key={budget.id}>
            <TableCell className="font-medium">{budget.amount}</TableCell>
            <TableCell>{budget.category}</TableCell>
            <TableCell>{budget.description}</TableCell>
            <TableCell>{budget.day}</TableCell>
            <TableCell>{budget.month}</TableCell>
            <TableCell className="text-right">{budget.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    );
  };
  
  export default ExpenseList;
  