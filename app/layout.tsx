import type React from "react"
import { Providers } from "./providers"
import "./globals.css"

export const metadata = {
  title: "Finance Dashboard",
  description: "A modern finance dashboard with glassmorphism design",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

