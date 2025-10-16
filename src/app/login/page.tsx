"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../context/auth-context"

export default function LoginPage() {
  const { login, error: authError } = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(form.email, form.password)
    } catch (err) {
      setError(authError || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-8 py-16 font-serif text-black max-w-md mx-auto">
      <h1 className="text-6xl font-bold mb-8">Login</h1>

      {error && <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 text-sm">{error}</div>}

      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 block w-full border border-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="mt-2 block w-full border border-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 border border-black bg-black text-white text-sm font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {"Don't have an account? "}
        <Link href="/signup" className="underline hover:text-black">
          Sign up
        </Link>
      </p>
    </main>
  )
}
