"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getExpense } from "@/app/actions/actions";

export function TableDemo() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getExpense();
            setExpenses(data);
        }
        fetchData();
    }, []);

    const totalBalance = expenses.reduce((acc, expense) => {
        const amount = parseFloat(expense.Amount); // Ensure Amount is parsed correctly
        return expense.Status === "Debited" ? acc - amount : acc + amount;
    }, 0);

    return (
        <Table className="max-h-20">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount (in Rs)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses.map((expense) => (
                    <TableRow key={expense.ExpenseID} className="max-h-1">
                        <TableCell className="font-medium text-sm">
                            {new Date(expense.Date).toLocaleDateString()} 
                            {/* Added () to fix toLocaleDateString */}
                        </TableCell>
                        <TableCell className={expense.Status === "Debited" ? "text-red-400" : "text-green-400"}>
                            {expense.Status}
                        </TableCell>
                        <TableCell>{expense.Method}</TableCell>
                        <TableCell className="text-center">
                            {expense.Status === "Debited" ? "-" : "+"} {parseFloat(expense.Amount)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className={`text-center ${totalBalance < 0 ? "text-red-400" : "text-green-400"}`}>
                        {isNaN(totalBalance) ? "0.00" : totalBalance.toFixed(2)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
