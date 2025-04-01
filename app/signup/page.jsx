"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createUser } from "@/app/actions/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, Mail } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const form = new FormData(e.currentTarget)
    const firstName = form.get("firstName")
    const lastName = form.get("lastName")
    const email = form.get("email")
    const password = form.get("password")

    try {
      const result = await createUser(firstName, email, password, lastName)

      if (result.error) {
        setError(result.error)
      } else {
        // Store user data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("userFirstName", firstName)
          localStorage.setItem("userEmail", email)
          localStorage.setItem("userId", result.user?.UserID || "user123")
        }

        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (error) {
      setError("Failed to create account. Please try again.")
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
          <h2 className="font-extrabold text-2xl md:text-3xl text-white">
            Welcome to <span className="text-blue-400">RealityCheque</span>! 💰
          </h2>
        </div>

        <p className="text-slate-300 text-sm md:text-base mt-2">
          To access your dashboard and manage your expenses, please sign up. Your financial future starts here!
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md text-red-300 text-sm">{error}</div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-500/50 rounded-md text-green-300 text-sm">
            Signup successful! Redirecting to dashboard...
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInputContainer>
              <Label htmlFor="firstName" className="text-slate-300">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Riya"
                type="text"
                required
                className="bg-slate-900/50 border-slate-700"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName" className="text-slate-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Dsouza"
                type="text"
                className="bg-slate-900/50 border-slate-700"
              />
            </LabelInputContainer>
          </div>

          {/* Email & Password */}
          <LabelInputContainer>
            <Label htmlFor="email" className="text-slate-300">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="riyadsouza@xyz.com"
              type="email"
              required
              className="bg-slate-900/50 border-slate-700"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
              className="bg-slate-900/50 border-slate-700"
            />
          </LabelInputContainer>

          {/* Signup Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none h-11"
            type="submit"
          >
            Sign Up &rarr;
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

          {/* Login Link */}
          <p className="text-center text-sm text-slate-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Log in
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

