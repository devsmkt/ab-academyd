"use client"

import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  // Simulated user data
  const [user, setUser] = useState({
    name: "Riyaz",
    email: "riyaz@example.com",
    role: "Student",
    avatar: "/user-avatar.jpg",
    totalCourses: 5,
    completedLessons: 18,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setEditMode(false);
    // TODO: Call API to save changes
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Avatar & Stats */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full border-2 border-gray-300"
          />
          <h2 className="text-xl font-medium">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p>Total Courses: <span className="font-medium">{user.totalCourses}</span></p>
            <p>Completed Lessons: <span className="font-medium">{user.completedLessons}</span></p>
          </div>
        </div>

        {/* Right: Editable Info */}
        <div className="flex-1">
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Account Information</h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-sm text-blue-500 hover:underline"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {editMode && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Optional: Change Password Section */}
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
