"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, Mail } from "lucide-react"

// Mock function to check if user exists - in a real app, this would call an API
async function checkUserCredentials(email, password) {
  // This is a placeholder. In a real app, you would validate against your database
  // For demo purposes, we'll accept any email with a password that's at least 6 characters
  if (password.length >= 6) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      user: {
        firstName: "Alex",
        email: email,
        userId: "user123",
      },
    }
  }

  return {
    success: false,
    error: "Invalid email or password",
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const email = form.get("email")
    const password = form.get("password")

    try {
      const result = await checkUserCredentials(email, password)

      if (result.success) {
        // Store user data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("userFirstName", result.user.firstName)
          localStorage.setItem("userEmail", result.user.email)
          localStorage.setItem("userId", result.user.userId)
        }

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 blue-gradient">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 left-4 p-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-sm"
      >
        <ArrowLeft className="h-5 w-5 text-slate-300" />
      </Link>

      {/* Logo */}
      <div className="flex justify-center md:justify-start w-full md:w-1/2 mb-8 md:mb-0">
        <Image
          width={400}
          height={400}
          src="/login.png"
          alt="Website Logo"
          className="object-contain sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[400px]"
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 max-w-lg p-8 shadow-lg rounded-2xl blue-card backdrop-blur-md border border-slate-700/50 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-2xl md:text-3xl text-white">Welcome Back! 👋</h2>
        </div>

        <p className="text-slate-300 text-sm md:text-base mt-2">
          Log in to access your dashboard and continue managing your finances.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md text-red-300 text-sm">{error}</div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-slate-300">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="your@email.com"
              type="email"
              required
              className="bg-slate-900/50 border-slate-700"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
              className="bg-slate-900/50 border-slate-700"
            />
          </LabelInputContainer>

          {/* Login Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none h-11"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          {/* Divider */}
          <div className="my-6 h-px bg-slate-700" />

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 bg-slate-900/50 border-slate-700 text-white h-11"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">Continue with GitHub</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 bg-slate-900/50 border-slate-700 text-white h-11"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">Continue with Google</span>
            </Button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-slate-400 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const LabelInputContainer = ({ children }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>
}

