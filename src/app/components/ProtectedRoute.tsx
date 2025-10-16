"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"

type UserRole = "student" | "instructor" | "admin"

type ProtectedRouteProps = {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export default function ProtectedRoute({ children, allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user) {
        router.push(redirectTo)
        return
      }

      // Check role-based access
      if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        // Redirect to appropriate dashboard based on user's role
        const roleRoutes: Record<UserRole, string> = {
          student: "/student/dashboard",
          instructor: "/instructor/dashboard",
          admin: "/admin/dashboard",
        }
        router.push(roleRoutes[user.role as UserRole] || "/")
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated or wrong role
  if (!user || (allowedRoles && !allowedRoles.includes(user.role as UserRole))) {
    return null
  }

  return <>{children}</>
}
