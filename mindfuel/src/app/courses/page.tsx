"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Star, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TCourse } from "@/types";
import { useAuth } from "@/context/FindUser";
import { useQuery } from "@tanstack/react-query";
import { GetAllCourses } from "@/services/CourseServices";

export default function CoursesPage() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: GetAllCourses,
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading courses...</p>
        </div>
      </div>
    );
  }

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

        {courses.length === 0 ? (
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
              <div
                key={course._id}
                className="group relative overflow-hidden rounded-xl border border-slate-700/50 hover:border-blue-500/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/80 text-white text-sm font-medium">
                      ৳ {course.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1">4.8</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span className="ml-1">1.2k</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span className="ml-1">12h 30m</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course._id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                  >
                    View Course
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
