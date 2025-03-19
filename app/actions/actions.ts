"use server";

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// Define the shape of the response for createUser
interface CreateUserResponse {
  success?: boolean;
  user?: { UserID: string; firstName: string; lastName: string | null; Email: string; Password: string };
  error?: string;
}

// Define the shape of the expense data for addExpense
interface ExpenseData {
  Status: string;
  Method: string;
  Amount: number;
  UserID: string;
  Category?: string;
  Date?: Date;
}

// Define the shape of the response for addExpense and deleteExpense
interface ExpenseResponse {
  success?: boolean;
  error?: string;
}

export async function createUser(
  firstName: string,
  Email: string,
  Password: string,
  lastName?: string
): Promise<CreateUserResponse> {
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        Email,
        Password,
      },
    });
    revalidatePath("/");
    return { success: true, user };
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "P2002") {
      return { error: "Email already exists" };
    }
    return { error: "Failed to create user" };
  }
}

export async function getExpense(): Promise<any[]> {
  return await prisma.monthlyExpenses.findMany({
    orderBy: { Date: "desc" },
  });
}

export async function addExpense(data: ExpenseData): Promise<ExpenseResponse> {
  try {
    // Validate that the UserID exists in the User table
    const user = await prisma.user.findUnique({
      where: { UserID: data.UserID },
    });

    if (!user) {
      throw new Error("Invalid UserID: User does not exist");
    }

    await prisma.monthlyExpenses.create({
      data: {
        ...data,
        Date: new Date(),
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error adding expense:", error);
    return { error: error.message || "Failed to add expense" };
  }
}

export async function deleteExpense(expenseId: number): Promise<ExpenseResponse> {
  try {
    // Validate that the ExpenseID exists
    const expense = await prisma.monthlyExpenses.findUnique({
      where: { ExpenseID: expenseId },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    await prisma.monthlyExpenses.delete({
      where: { ExpenseID: expenseId },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting expense:", error);
    return { error: error.message || "Failed to delete expense" };
  }
}