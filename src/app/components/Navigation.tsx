"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "../context/auth-context"

type UserRole = "student" | "instructor" | "admin"

export default function Navigation() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Role-based menu
  const roleMenuItems = user
    ? user.role === "student"
      ? [
          { name: "Dashboard", href: "/student/dashboard" },
          { name: "My Courses", href: "/student/courses" },
          { name: "Profile", href: "/student/profile" },
        ]
      : user.role === "instructor"
        ? [
            { name: "Dashboard", href: "/instructor/dashboard" },
            { name: "My Courses", href: "/instructor/courses" },
            { name: "Create Course", href: "/instructor/create-course" },
            { name: "Profile", href: "/instructor/profile" },
          ]
        : [
            { name: "Admin Panel", href: "/admin/dashboard" },
            { name: "Users", href: "/admin/users" },
            { name: "Courses", href: "/admin/courses" },
            { name: "Profile", href: "/admin/profile" },
          ]
    : []

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-8 py-4 shadow-sm relative z-50 bg-white">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src="/academy-logo.svg" alt="Academy Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Common Nav Links */}
      <div className="hidden md:flex space-x-6 text-sm uppercase font-medium">
        <Link href="/about" className="hover:text-gray-800 transition">
          About
        </Link>
        <Link href="/courses" className="hover:text-gray-800 transition">
          Courses
        </Link>
        <Link href="/membership" className="hover:text-gray-800 transition">
          Membership
        </Link>
      </div>

      {/* Auth / User */}
      <div className="flex items-center gap-4 relative">
        {user ? (
          <div ref={dropdownRef} className="relative">
            {/* Avatar Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none rounded-full hover:ring-2 hover:ring-gray-400 transition"
            >
              <Image
                src={user.avatar || "/user.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 animate-fadeIn origin-top-right z-50">
                {roleMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:underline transition">
              Log In
            </Link>
            <Link
              href="/signup"
              className="border border-black bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
