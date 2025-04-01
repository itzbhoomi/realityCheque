"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addExpense } from "@/app/actions/actions";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

export function AddExpenseDialog({ children, userId }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Debited");
  const [method, setMethod] = useState("Cash");
  const [category, setCategory] = useState("Housing");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    // Validate input
    if (!method || !amount || isNaN(Number(amount))) {
      toast("Please enter a valid amount and select a payment method.", { variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const result = await addExpense({
        Amount: Number.parseFloat(amount),
        Status: status,
        Method: method,
        Category: category,
        UserID: userId,
      });

      // Check if result is undefined or doesn't have expected properties
      if (!result || typeof result !== "object") {
        throw new Error("Unexpected response from server");
      }

      if (result.error) {
        throw new Error(result.error);
      }

      toast({ title: "Success!", description: "Expense added successfully." });

      // Reset form
      setAmount("");
      setStatus("Debited");
      setMethod("Cash");
      setCategory("Housing");
      setOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none">
            Add Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={`${isMobile ? "w-[95%]" : "sm:max-w-[425px]"} blue-card backdrop-blur-md border-slate-200/50 dark:border-slate-700/50`}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-800 dark:text-white">Add New Expense</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Enter the details of your expense here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Expense Type */}
            <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
              <Label className={`${isMobile ? "" : "text-right"} text-slate-600 dark:text-slate-300`}>Type</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={`${isMobile ? "w-full" : "col-span-3"} bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white w-full">
                  <SelectItem value="Debited">Expense (Debited)</SelectItem>
                  <SelectItem value="Credited">Income (Credited)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
              <Label className={`${isMobile ? "" : "text-right"} text-slate-600 dark:text-slate-300`}>Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white w-full">
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expense Category */}
            <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
              <Label className={`${isMobile ? "" : "text-right"} text-slate-600 dark:text-slate-300`}>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white w-full">
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
              <Label className={`${isMobile ? "" : "text-right"} text-slate-600 dark:text-slate-300`}>Amount</Label>
              <Input
                id="amount"
                placeholder="₹0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter className={isMobile ? "flex-col space-y-2" : undefined}>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}