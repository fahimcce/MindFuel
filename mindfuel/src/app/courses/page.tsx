"use client";
import { BookOpen } from "lucide-react";
import { TCourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { GetAllCourses } from "@/services/CourseServices";
import CourseCard from "@/components/shared/CourseCard";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function CoursesPage() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: GetAllCourses,
    staleTime: 1000 * 60 * 3,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-600/20 rounded-full border border-blue-400/50 mb-6">
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium text-blue-200">
              Expand Your Knowledge
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-300 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover premium learning paths designed to elevate your skills and
            accelerate your career.
          </p>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : courses.length === 0 ? (
          <div className="max-w-2xl mx-auto p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
            <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No courses available
            </h3>
            <p className="text-slate-400">
              Check back later for new courses, or contact support if you
              believe this is an error.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: TCourse) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
