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
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { deleteExpense } from "@/app/actions/actions"; // We'll create this action next
import { toast } from "sonner";

export function TableDemo({ expenses, onExpenseDeleted }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenDialog = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedExpenseId) return;

    setIsDeleting(true);
    try {
      const result = await deleteExpense(selectedExpenseId);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({ title: "Success!", description: "Expense deleted successfully." });
      setOpenDialog(false);
      onExpenseDeleted(selectedExpenseId); // Notify parent to refresh expenses
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    // Placeholder for edit functionality
    toast({ title: "Info", description: "Edit functionality coming soon!" });
    setOpenDialog(false);
  };

  return (
    <div className="relative">
      <table className="max-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Method
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {expenses.map((expense) => (
            <tr key={expense.ExpenseID}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {new Date(expense.Date).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {expense.Status}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {expense.Method}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                ₹{expense.Amount.toLocaleString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {expense.Category || "N/A"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(expense.ExpenseID)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] blue-card backdrop-blur-md border-slate-200/50 dark:border-slate-700/50">
                    <DialogHeader>
                      <DialogTitle className="text-slate-800 dark:text-white">
                        Delete Expense
                      </DialogTitle>
                      
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />{" "}
                        {isDeleting ? "Deleting..." : "Delete Expense"}
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenDialog(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}