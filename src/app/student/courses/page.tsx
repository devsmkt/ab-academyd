"use client"

import { useState } from "react";
import Image from "next/image";

type Lesson = {
  id: number;
  title: string;
  type: "video" | "article" | "pdf";
  completed: boolean;
  duration?: string; // e.g., "14:27"
  size?: string; // e.g., "5 MB"
};

export default function StudentCoursePage() {
  const course = {
    title: "Beginner Barbering",
    totalLessons: 12,
    completedLessons: 6,
  };

  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, title: "The Fundamentals of Barbering", type: "article", completed: true, size: "5 MB" },
    { id: 2, title: "Understanding Client Psychology", type: "video", completed: true, duration: "14:27" },
    { id: 3, title: "The Art of the Fade", type: "video", completed: false, duration: "11:12" },
    { id: 4, title: "Advanced Techniques", type: "pdf", completed: false, size: "12 MB" },
  ]);

  const toggleComplete = (id: number) => {
    setLessons(prev =>
      prev.map(lesson =>
        lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  const progress = Math.round(
    (lessons.filter(l => l.completed).length / lessons.length) * 100
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
          <span>Progress</span>
          <span>{progress}% Completed</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.map(lesson => (
          <div
            key={lesson.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {/* Lesson Type Icon */}
              {lesson.type === "video" && (
                <Image src="/icons/video.svg" alt="Video" width={24} height={24} />
              )}
              {lesson.type === "article" && (
                <Image src="/icons/article.svg" alt="Article" width={24} height={24} />
              )}
              {lesson.type === "pdf" && (
                <Image src="/icons/pdf.svg" alt="PDF" width={24} height={24} />
              )}

              <div>
                <h2 className="font-medium">{lesson.title}</h2>
                {lesson.duration && <p className="text-xs text-gray-500">{lesson.duration}</p>}
                {lesson.size && <p className="text-xs text-gray-500">{lesson.size}</p>}
              </div>
            </div>

            <button
              onClick={() => toggleComplete(lesson.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.completed
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {lesson.completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
