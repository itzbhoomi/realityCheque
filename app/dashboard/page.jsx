"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TableDemo } from "@/components/table-demo"
import Calendar  from "@/components/ui/calendar"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { Bell, ChevronRight, LineChart, Menu, Plus, User, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getExpense } from "@/app/actions/actions"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"

// Function to get user data, ensuring it runs on the client
function getUserData() {
  // Check if window is defined (client-side)
  if (typeof window === "undefined") {
    return { firstName: "Guest", email: "guest@example.com", userId: "user123" }
  }
  // For now, we'll use localStorage to simulate fetching user data after signup
  const firstName = localStorage.getItem("userFirstName") || "Guest"
  const email = localStorage.getItem("userEmail") || "guest@example.com"
  const userId = localStorage.getItem("userId") || "user123"
  return { firstName, email, userId }
}

export default function Dashboard() {
  const router = useRouter()
  const [date, setDate] = useState(new Date())
  const [expenses, setExpenses] = useState([])
  const [totalDebited, setTotalDebited] = useState(0)
  const [totalCredited, setTotalCredited] = useState(0)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ id: "", name: "", email: "", avatar: "/placeholder-user.jpg", budget: 50000 })
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Check if user is logged in
    const userData = getUserData()
    if (userData.firstName === "Guest" && typeof window !== "undefined") {
      // Redirect to login if not logged in
      router.push("/login")
      return
    }

    setUser({
      id: userData.userId,
      name: userData.firstName,
      email: userData.email,
      avatar: "/placeholder-user.jpg",
      budget: 50000,
    })

    fetchExpenses(userData.userId)
  }, [router])

  const fetchExpenses = async (userId) => {
    try {
      const data = await getExpense()
      const userExpenses = data.filter((expense) => expense.UserID === userId)
      setExpenses(userExpenses)

      let debited = 0
      let credited = 0

      userExpenses.forEach((expense) => {
        const amount = Number.parseFloat(expense.Amount)
        if (expense.Status === "Debited") {
          debited += amount
        } else {
          credited += amount
        }
      })

      setTotalDebited(debited)
      setTotalCredited(credited)
      setBalance(credited - debited)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExpenseDeleted = (expenseId) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.ExpenseID !== expenseId))
    fetchExpenses(user.id) // Refresh totals after deletion
  }

  const budgetUsedPercentage = Math.min(100, Math.round((totalDebited / user.budget) * 100))
  const remainingBudget = user.budget - totalDebited

  return (
    <div className="min-h-screen blue-gradient">
      <SidebarProvider>
        <AppSidebar />
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 responsive-padding">
          <header className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-10 w-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center">
                <Menu className="h-5 w-5 text-slate-300" />
              </SidebarTrigger>

              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Welcome back, <span className="text-blue-400">{user.name}</span>
                </h1>
                <p className="text-slate-400 mt-1 text-sm md:text-base">
                  Here's what's happening with your finances today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-slate-800/80 backdrop-blur-sm border-slate-700 h-9 w-9"
              >
                <Bell className="h-5 w-5 text-slate-400" />
              </Button>
              <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-slate-800">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-900 text-blue-300">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Monthly Budget</CardTitle>
                <CardDescription className="text-xl md:text-2xl font-bold text-white">
                  ₹{user.budget.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Spent</span>
                    <span className="font-medium text-slate-300">₹{totalDebited.toLocaleString()}</span>
                  </div>
                  <Progress value={budgetUsedPercentage} className="h-2 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </Progress>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{budgetUsedPercentage}% used</span>
                    <span className={remainingBudget >= 0 ? "text-green-400" : "text-red-400"}>
                      ₹{remainingBudget.toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Expenses</CardTitle>
                <CardDescription className="text-xl md:text-2xl font-bold text-white">
                  ₹{totalDebited.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-full h-10 bg-slate-700 rounded-md flex">
                    <div className="h-full w-[40%] bg-blue-500 rounded-l-md flex items-center justify-center text-xs text-white font-medium">
                      Housing
                    </div>
                    <div className="h-full w-[35%] bg-indigo-500 flex items-center justify-center text-xs text-white font-medium">
                      Food
                    </div>
                    <div className="h-full w-[25%] bg-sky-500 rounded-r-md flex items-center justify-center text-xs text-white font-medium">
                      Others
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-slate-400">Housing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-slate-400">Food</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                    <span className="text-slate-400">Others</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Balance</CardTitle>
                <CardDescription
                  className={`text-xl md:text-2xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  ₹{balance.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-300">Total Income</p>
                        <p className="text-xs text-green-400">+₹{totalCredited.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center">
                        <ArrowDownRight className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-300">Total Expenses</p>
                        <p className="text-xs text-red-400">-₹{totalDebited.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-white">Recent Expenses</CardTitle>
                    <CardDescription className="text-slate-400">Your expenditures this month</CardDescription>
                  </div>
                  <AddExpenseDialog userId={user.id}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Expense
                    </Button>
                  </AddExpenseDialog>
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      "rounded-lg overflow-hidden",
                      "bg-slate-900/80 backdrop-blur-sm",
                      "border border-slate-700/50",
                    )}
                  >
                    {loading ? (
                      <div className="p-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        <p className="mt-2 text-sm text-slate-400">Loading expenses...</p>
                      </div>
                    ) : (
                      <div className="overflow-x-hidden">
                        <TableDemo expenses={expenses} onExpenseDeleted={handleExpenseDeleted} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-white">Calendar</CardTitle>
                    <CardDescription className="text-slate-400">Add bill due reminders</CardDescription>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-slate-700 bg-slate-900/80 backdrop-blur-sm p-3"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 mt-6 text-white backdrop-blur-md border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-100">Monthly Report</p>
                      <p className="text-xl font-bold">
                        {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <LineChart className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-100">View full report</span>
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

