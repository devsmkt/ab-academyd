"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "student" | "instructor" | "admin"

type User = {
  id: number
  name: string
  email: string
  role: UserRole
  avatar?: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, confirmPassword: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
      } catch (err) {
        console.error("Failed to parse stored user:", err)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch("http://157.245.126.153:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const text = await res.text()
      let data

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error("Invalid response from server")
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Save token and user
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setToken(data.access_token)
      setUser(data.user)

      // Redirect based on role
      const roleRoutes: Record<UserRole, string> = {
        student: "/student/dashboard",
        instructor: "/instructor/dashboard",
        admin: "/admin/dashboard",
      }

      router.push(roleRoutes[data.user.role as UserRole] || "/")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string, role: UserRole) => {
    setError(null)
    setIsLoading(true)

    try {
      console.log("[v0] Register attempt:", { name, email, role })

      const res = await fetch("http://157.245.126.153:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          role,
        }),
      })

      console.log("[v0] Response status:", res.status)

      const text = await res.text()
      console.log("[v0] Response text:", text)

      let data

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error("Invalid response from server")
      }

      if (!res.ok) {
        console.log("[v0] Registration failed:", data)
        throw new Error(data.message || "Registration failed")
      }

      console.log("[v0] Registration successful:", data)

      // Save token and user
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setToken(data.access_token)
      setUser(data.user)

      // Redirect based on role
      const roleRoutes: Record<UserRole, string> = {
        student: "/student/dashboard",
        instructor: "/instructor/dashboard",
        admin: "/admin/dashboard",
      }

      router.push(roleRoutes[role] || "/")
    } catch (err) {
      console.error("[v0] Registration error:", err)
      const errorMessage = err instanceof Error ? err.message : "Registration failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear storage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Clear state
    setToken(null)
    setUser(null)

    // Redirect to home
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
