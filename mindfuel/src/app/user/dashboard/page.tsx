"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MyCourses } from "@/services/CourseServices";
import { BookOpen } from "lucide-react";
import Loader from "@/components/shared/Loader";

export default function UserDashboardPage() {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-courses"],
    queryFn: MyCourses,
    staleTime: 1000 * 60 * 2,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-400" />
          My Courses
        </h1>

        {isLoading && <Loader />}

        {isError && (
          <div className="text-red-400 text-lg">Failed to load courses.</div>
        )}

        {!isLoading && !isError && (!courses || courses.length === 0) && (
          <div className="text-slate-400 text-lg">
            You are not enrolled in any courses yet.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses?.map((course: any) => (
            <div
              key={course._id}
              className="flex flex-col md:flex-row w-full rounded-xl overflow-hidden shadow-lg border bg-slate-800/60"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full md:w-48 h-40 md:h-auto object-cover"
              />
              <div className="flex-1 p-5 flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-slate-400 mb-4 flex-1">
                  {course.description}
                </p>
                <Link
                  href={`/user/courses/${course._id}/learn`}
                  className="inline-block mt-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 text-center"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
