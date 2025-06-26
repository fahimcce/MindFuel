"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  Play,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { TLecture, TModule } from "@/types";
import { staticInstructors, staticReviews } from "@/lib/staticData";
import { PurchasedCourse, GetSingleCourses } from "@/services/CourseServices";
import { useAuth } from "@/context/FindUser";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default function CourseDetail({ params }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = React.use(params);
  const courseId = id;

  const {
    data: course,
    isLoading: courseLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => GetSingleCourses(id),
    staleTime: 1000 * 60 * 2,
  });

  const getModuleLectures = (moduleId: string) => {
    const module = course?.modules?.find((m: TModule) => m._id === moduleId);
    return module?.lectures || [];
  };

  const totalLectures = course?.modules
    ? course.modules.reduce(
        (sum: number, module: TModule) => sum + (module.lectures?.length || 0),
        0
      )
    : 0;
  const totalDuration = "12h 30m";
  const instructor = staticInstructors[0];
  const courseReviews = staticReviews;

  const averageRating =
    courseReviews.length > 0
      ? courseReviews.reduce((sum, review) => sum + review.rating, 0) /
        courseReviews.length
      : 4.8;

  const purchaseMutation = useMutation({
    mutationFn: (payload: { courseId: string }) => PurchasedCourse(payload),
    onSuccess: () => {
      toast.success("Course purchased successfully!");
      router.push("/user/dashboard");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to purchase course.");
    },
  });

  const handlePurchase = () => {
    if (!user) {
      toast.error("Please login first to purchase this course.");
      return;
    }
    purchaseMutation.mutate({ courseId });
  };

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading course...</p>
        </div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Course not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses">
                <button className="flex items-center text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video relative overflow-hidden rounded-xl mb-6 border border-slate-700/50">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={1280}
                height={720}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-slate-400 mb-6">{course.description}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold text-white">
                  {averageRating.toFixed(1)}
                </span>
                <span className="ml-1 text-slate-400">
                  ({courseReviews.length} reviews)
                </span>
              </div>
              <div className="flex items-center text-slate-400">
                <Users className="h-5 w-5 mr-1" />
                <span>2,547 students</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Clock className="h-5 w-5 mr-1" />
                <span>{totalDuration}</span>
              </div>
            </div>

            {/* Instructor Info */}
            {instructor && (
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Instructor
                </h2>
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {instructor.name}
                    </h3>
                    <p className="text-slate-400">{instructor.title}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What you'll learn */}
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-300">
                    Build modern web applications
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-300">
                    Master React and TypeScript
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-300">Learn best practices</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-300">Deploy to production</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Student Reviews
              </h2>
              <div className="space-y-4">
                {courseReviews.slice(0, 3).map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-slate-700/50 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-sm font-medium">
                          {review.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-white">
                          {review.userName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300 mb-2">
                  ৳ {course.price}
                </div>
                <span className="inline-block px-3 py-1 text-sm bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30">
                  30-day money-back guarantee
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  {!user ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-red-400 font-semibold">
                        Please login to purchase this course.
                      </div>
                      <button
                        onClick={() => router.push("/login")}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                      >
                        Go to Login
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handlePurchase}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Purchase Here - Start Learning
                    </button>
                  )}
                </div>

                <div className="h-px bg-slate-700/50 my-4"></div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Total lectures</span>
                    <span className="font-semibold">{totalLectures}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total duration</span>
                    <span className="font-semibold">{totalDuration}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Skill level</span>
                    <span className="font-semibold">Beginner</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Language</span>
                    <span className="font-semibold">English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-2">Course Content</h2>
          <p className="text-slate-400 mb-6">
            {course?.modules?.length} modules • {totalLectures} lectures • 150
            total length
          </p>

          {course?.modules?.length === 0 ? (
            <p className="text-slate-500 italic py-8 text-center">
              Course content is being prepared. Check back soon!
            </p>
          ) : (
            <div className="space-y-4">
              {course?.modules.map((module: TModule, index: number) => {
                const moduleLectures = getModuleLectures(module._id);

                return (
                  <div
                    key={module._id}
                    className="rounded-lg border border-slate-700/50 overflow-hidden"
                  >
                    <div className="p-4 bg-slate-800/30 border-b border-slate-700/50">
                      <h3 className="font-semibold text-lg text-white">
                        Module {module.moduleNumber}: {module.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {moduleLectures.length} lectures
                      </p>
                    </div>
                    <div className="divide-y divide-slate-700/50">
                      {moduleLectures.map(
                        (lecture: TLecture, lectureIndex: number) => (
                          <div
                            key={lecture._id}
                            className="p-4 hover:bg-slate-800/30 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Play className="h-4 w-4 text-blue-400" />
                                <div>
                                  <p className="font-medium text-white">
                                    {lecture.title}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                                    <span>5:30</span>
                                    {lecture.pdfNotes.length > 0 && (
                                      <div className="flex items-center">
                                        <FileText className="h-3 w-3 mr-1" />
                                        <span>
                                          {lecture.pdfNotes.length} resources
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
