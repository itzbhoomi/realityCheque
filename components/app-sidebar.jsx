"use client"
import { BarChart3, CreditCard, DollarSign, Home, PieChart, Settings, User, Wallet, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect } from "react"

export function AppSidebar() {
  const { isMobile, toggleSidebar, setOpen } = useSidebar()
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  // Close sidebar by default on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isSmallScreen, setOpen])

  return (
    <Sidebar className="border-r-0" variant="floating">
      <SidebarHeader className="flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl text-slate-800 dark:text-white">
            reality<span className="text-blue-600 dark:text-blue-400">Cheque</span>
          </span>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Dashboard">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Transactions">
              <CreditCard className="h-5 w-5" />
              <span>Transactions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Budgets">
              <DollarSign className="h-5 w-5" />
              <span>Budgets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports">
              <BarChart3 className="h-5 w-5" />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <PieChart className="h-5 w-5" />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto pb-6">
        <div className="px-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-6 px-4">
            <div className="flex items-center gap-3 rounded-lg bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm p-3">
              <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-700">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Alex Johnson</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

