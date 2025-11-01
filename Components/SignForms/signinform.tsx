"use client"

import type React from "react"
import { useState } from "react"

export default function SigninForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Sign In:", formData)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm font-medium">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#FF9833] focus:ring-2 focus:ring-[#FF9833]/30 transition shadow-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-900">Password</label>
              <a href="#" className="text-xs text-[#FF9833] hover:text-[#FF8C1A] font-medium">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#FF9833] focus:ring-2 focus:ring-[#FF9833]/30 transition shadow-sm"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#FF9833] hover:bg-[#FF8C1A] active:bg-[#FF7A00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#FF9833] hover:text-[#FF8C1A] font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
