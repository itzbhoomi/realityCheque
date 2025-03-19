"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Code, LineChart, Shield, Star, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen blue-gradient theme-transition">
      {/* Header/Navigation */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                Finance<span className="text-blue-400">Pro</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#faq" className="text-slate-300 hover:text-white transition-colors">
                FAQ
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Manage Your Finances with Confidence
              </h1>
              <p className="mt-6 text-xl text-slate-300">
                Track expenses, set budgets, and gain insights into your financial health with our intuitive dashboard.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none h-12 px-8 text-lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#demo">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white h-12 px-8 text-lg"
                  >
                    View Demo
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs text-white"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-slate-400">
                  <span className="text-blue-400 font-medium">1,000+</span> users already managing their finances
                </p>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="glass rounded-2xl p-2 shadow-xl">
                <Image
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  width={800}
                  height={500}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Powerful Features</h2>
            <p className="mt-4 text-xl text-slate-300">Everything you need to take control of your finances</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LineChart className="h-8 w-8 text-blue-400" />,
                title: "Expense Tracking",
                description: "Easily log and categorize your expenses to understand where your money goes.",
              },
              {
                icon: <Wallet className="h-8 w-8 text-blue-400" />,
                title: "Budget Management",
                description: "Set monthly budgets and get alerts when you're approaching your limits.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-400" />,
                title: "Secure Data",
                description: "Your financial data is encrypted and protected with the highest security standards.",
              },
              {
                icon: <Code className="h-8 w-8 text-blue-400" />,
                title: "API Integration",
                description: "Connect with your bank accounts for automatic transaction imports.",
              },
              {
                icon: <Star className="h-8 w-8 text-blue-400" />,
                title: "Financial Insights",
                description: "Get personalized insights and recommendations to improve your financial health.",
              },
              {
                icon: <LineChart className="h-8 w-8 text-blue-400" />,
                title: "Reports & Analytics",
                description: "Visualize your spending patterns with beautiful charts and reports.",
              },
            ].map((feature, index) => (
              <Card key={index} className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-slate-300">No hidden fees or complicated tiers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-slate-300">Free</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="ml-1 text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {["Basic expense tracking", "Monthly budget", "Up to 50 transactions", "Email support"].map(
                    (feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Button className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="blue-card backdrop-blur-md border-blue-500/20 shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-slate-300">Pro</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$9.99</span>
                  <span className="ml-1 text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    "Everything in Free",
                    "Unlimited transactions",
                    "Advanced analytics",
                    "Bank account sync",
                    "Priority support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-slate-300">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$29.99</span>
                  <span className="ml-1 text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    "Everything in Pro",
                    "Team collaboration",
                    "Custom reporting",
                    "API access",
                    "Dedicated account manager",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of users who are already managing their money more effectively.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex-1 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none px-8 py-3 h-auto">
                Get Started
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-400">Free 14-day trial. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-slate-300">Find answers to common questions about FinancePro</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Is my financial data secure?",
                answer:
                  "Yes, we use bank-level encryption to protect your data. We never store your bank credentials and use secure connections for all data transfers.",
              },
              {
                question: "Can I connect my bank accounts?",
                answer:
                  "Yes, FinancePro supports integration with over 10,000 financial institutions worldwide through secure API connections.",
              },
              {
                question: "Is there a mobile app available?",
                answer:
                  "Yes, we offer mobile apps for both iOS and Android platforms, allowing you to manage your finances on the go.",
              },
              {
                question: "Can I export my financial data?",
                answer:
                  "Yes, you can export your data in various formats including CSV, PDF, and Excel for your records or further analysis.",
              },
              {
                question: "What if I need help using the platform?",
                answer:
                  "We offer comprehensive support through our help center, email support, and live chat for Pro and Enterprise users.",
              },
            ].map((faq, index) => (
              <Card key={index} className="blue-card backdrop-blur-md border-slate-700/50 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Wallet className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-lg font-bold text-white">
                  Finance<span className="text-blue-400">Pro</span>
                </span>
              </div>
              <p className="mt-4 text-slate-400">
                Your personal finance management solution for a better financial future.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Testimonials", "FAQ"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Press"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Security"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2023 FinancePro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-slate-400 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

