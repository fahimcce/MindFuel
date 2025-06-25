"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Search,
  Play,
  FileText,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { TLecture, TModule } from "@/types";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetSingleCourses } from "@/services/CourseServices";
import { UpdateLecture } from "@/services/LectureServices";

export default function LearningPage() {
  const params = useParams();
  const courseId = params.id as string;

  const {
    data: course,
    isLoading: courseLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => GetSingleCourses(courseId),
    staleTime: 1000 * 60 * 2,
    enabled: !!courseId,
  });

  // UI state
  const [currentLecture, setCurrentLecture] = useState<TLecture | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<{ completed: string[] }>({
    completed: [],
  });
  const [noMoreLectures, setNoMoreLectures] = useState(false);

  // Set initial lecture and open first module
  useEffect(() => {
    if (course && course.modules && course.modules.length > 0) {
      const firstModule = course.modules[0];
      setOpenModules(new Set([firstModule._id]));
      if (firstModule.lectures && firstModule.lectures.length > 0) {
        setCurrentLecture(firstModule.lectures[0]);
      }
    }
  }, [course]);

  // Helper: get lectures for a module
  const getModuleLectures = (moduleId: string) => {
    const module = course?.modules?.find((m: TModule) => m._id === moduleId);
    return module?.lectures || [];
  };

  // Helper: all lectures flat
  const allLectures: TLecture[] =
    course?.modules?.flatMap((m: TModule) => m.lectures || []) || [];

  // Search
  const filteredLectures = allLectures.filter((lecture) =>
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Progress helpers
  const isLectureCompleted = (lectureId: string) => {
    const lecture = allLectures.find((l) => l._id === lectureId);
    return lecture ? lecture.isLocked === false : false;
  };

  const isLectureUnlocked = (lecture: TLecture) => {
    // Unlocked if isLocked is false
    return lecture.isLocked === false;
  };

  // Navigation helpers
  const getCurrentLectureIndex = () =>
    currentLecture
      ? allLectures.findIndex((l) => l._id === currentLecture._id)
      : -1;

  const getCurrentModule = () => {
    if (!currentLecture) return null;
    return course?.modules?.find((m: TModule) =>
      m.lectures.some((l: TLecture) => l._id === currentLecture._id)
    );
  };

  const handleNextLecture = async () => {
    const idx = getCurrentLectureIndex();
    if (idx < allLectures.length - 1) {
      const next = allLectures[idx + 1];
      setCurrentLecture(next);

      // Unlock if needed
      if (currentLecture && currentLecture.isLocked) {
        try {
          await UpdateLecture(currentLecture._id, { isLocked: false });
          currentLecture.isLocked = false;
        } catch (e) {
          toast.error("Failed to update lecture progress");
        }
      }
      setNoMoreLectures(false);
    } else {
      // Last lecture: ensure it's unlocked
      if (currentLecture && currentLecture.isLocked) {
        try {
          await UpdateLecture(currentLecture._id, { isLocked: false });
          currentLecture.isLocked = false;
        } catch (e) {
          toast.error("Failed to update lecture progress");
        }
      }
      setNoMoreLectures(true);
    }
  };

  const handlePreviousLecture = () => {
    const idx = getCurrentLectureIndex();
    if (idx > 0) {
      setCurrentLecture(allLectures[idx - 1]);
    }
  };

  const isNextAvailable = () => true;
  const isPreviousAvailable = () => getCurrentLectureIndex() > 0;

  // Mark complete
  const markLectureComplete = (lectureId: string) => {
    setProgress((prev) => ({
      completed: prev.completed.includes(lectureId)
        ? prev.completed
        : [...prev.completed, lectureId],
    }));
  };

  // Video embed
  const getVideoEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  // Toggle module open/close
  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) newSet.delete(moduleId);
      else newSet.add(moduleId);
      return newSet;
    });
  };

  // Calculate progress per module (unlocked lectures)
  const getModuleProgress = (module: TModule) => {
    const total = module.lectures.length;
    const unlocked = module.lectures.filter((l) => l.isLocked === false).length;
    return { unlocked, total };
  };

  // Helper to open a lecture and unlock if needed
  const openLecture = async (lecture: TLecture) => {
    setCurrentLecture(lecture);
    if (lecture.isLocked) {
      try {
        await UpdateLecture(lecture._id, { isLocked: false });
        lecture.isLocked = false; // update local state for immediate UI feedback
      } catch (e) {
        toast.error("Failed to unlock lecture");
      }
    }
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Course not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-400 ml-4" />
              <span className="ml-2 text-xl font-bold text-white hidden sm:inline">
                {course.title}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Main Content - appears first on mobile */}
        <div className="flex-1 overflow-y-auto order-1 lg:order-1">
          {noMoreLectures ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  No lectures pending
                </h2>
                <p className="text-slate-400 text-lg">
                  Wait for upcoming lectures to be added!
                </p>
              </div>
            </div>
          ) : currentLecture ? (
            <div className="p-4 lg:p-6">
              <div className="mb-4 lg:mb-6">
                <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {currentLecture.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 text-sm text-slate-400">
                  <span>5:30 duration</span>
                  {currentLecture.pdfNotes.length > 0 && (
                    <>
                      <span>{currentLecture.pdfNotes.length} resources</span>
                    </>
                  )}
                </div>
              </div>

              {/* Video Player */}
              <div className="aspect-video mb-4 lg:mb-6 rounded-xl overflow-hidden bg-black border border-slate-700/50">
                <iframe
                  src={getVideoEmbedUrl(currentLecture.videoUrl)}
                  className="w-full h-full"
                  allowFullScreen
                  title={currentLecture.title}
                />
              </div>

              {/* Lecture Actions */}
              <div className="flex items-center justify-between mb-4 lg:mb-6 gap-2">
                <button
                  onClick={handlePreviousLecture}
                  disabled={!isPreviousAvailable()}
                  className={`flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 ${
                    isPreviousAvailable()
                      ? "text-white bg-slate-700 hover:bg-slate-600"
                      : "text-slate-500 bg-slate-800 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="text-sm lg:text-base">Previous</span>
                </button>

                <button
                  onClick={handleNextLecture}
                  disabled={!isNextAvailable()}
                  className={`flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 ${
                    isNextAvailable()
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                      : "text-slate-500 bg-slate-800 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm lg:text-base">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1 lg:ml-2" />
                </button>
              </div>

              {/* PDF Resources */}
              {currentLecture.pdfNotes.length > 0 && (
                <div className="p-4 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h2 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4 flex items-center">
                    <FileText className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    Lecture Resources
                  </h2>
                  <div className="space-y-2">
                    {currentLecture.pdfNotes.map((pdfUrl, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-700/50 gap-2"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-red-400 mr-3" />
                          <span className="text-slate-300 text-sm lg:text-base">
                            Lecture Notes {index + 1}
                          </span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-sm text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors w-full sm:w-auto"
                          >
                            View
                          </a>
                          <a
                            href={pdfUrl}
                            download
                            className="inline-flex items-center justify-center px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-sm text-white bg-blue-600/80 hover:bg-blue-500/80 rounded-lg transition-colors w-full sm:w-auto"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <BookOpen className="h-12 w-12 lg:h-16 lg:w-16 text-slate-500 mx-auto mb-3 lg:mb-4" />
                <h3 className="text-base lg:text-lg font-semibold text-white mb-2">
                  Select a lecture to start learning
                </h3>
                <p className="text-slate-400 text-sm lg:text-base">
                  Choose a lecture from the sidebar to begin watching.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - appears below main content on mobile */}
        <div className="w-full lg:w-1/3 bg-slate-800/50 border-t lg:border-l border-slate-700/50 overflow-y-auto order-2 lg:order-2">
          <div className="p-4">
            {/* Show only current module progress bar */}
            {(() => {
              const currentModule = getCurrentModule();
              if (!currentModule) return null;
              const { unlocked, total } = getModuleProgress(currentModule);
              const percent =
                total === 0 ? 0 : Math.round((unlocked / total) * 100);
              return (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white font-semibold">
                      Module {currentModule.moduleNumber}: {currentModule.title}
                    </span>
                    <span className="text-xs text-slate-400">
                      {unlocked}/{total} Unlocked
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Search input below */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
              />
            </div>

            <div className="space-y-2">
              {searchQuery ? (
                // Filtered search results
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Search Results
                  </h3>
                  {filteredLectures.map((lecture) => {
                    const module = course.modules.find(
                      (m: TModule) => m._id === lecture.moduleId
                    );
                    const isCompleted = isLectureCompleted(lecture._id);
                    const isUnlocked = isLectureUnlocked(lecture);

                    return (
                      <div
                        key={lecture._id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentLecture?._id === lecture._id
                            ? "bg-blue-900/30 border border-blue-700/50"
                            : "hover:bg-slate-700/30"
                        } ${!isUnlocked ? "opacity-50" : ""}`}
                        onClick={() => isUnlocked && openLecture(lecture)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {!isUnlocked ? (
                              <Lock className="h-4 w-4 text-slate-500" />
                            ) : isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Play className="h-4 w-4 text-blue-400" />
                            )}
                            <div>
                              <p className="font-medium text-sm text-white">
                                {lecture.title}
                              </p>
                              <p className="text-xs text-slate-400">
                                Module {module?.moduleNumber}: {module?.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Module structure
                course.modules.map((module: TModule) => {
                  const moduleLectures = getModuleLectures(module._id);
                  const isOpen = openModules.has(module._id);

                  return (
                    <div
                      key={module._id}
                      className="border border-slate-700/50 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(module._id)}
                        className="w-full p-3 text-left hover:bg-slate-700/30 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-sm text-white">
                            Module {module.moduleNumber}: {module.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {moduleLectures.length} lectures
                          </p>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-700/50">
                          {moduleLectures.map((lecture: TLecture) => {
                            const isCompleted = isLectureCompleted(lecture._id);
                            const isUnlocked = isLectureUnlocked(lecture);

                            return (
                              <div
                                key={lecture._id}
                                className={`p-3 border-b border-slate-700/50 last:border-b-0 cursor-pointer transition-colors ${
                                  currentLecture?._id === lecture._id
                                    ? "bg-blue-900/30 border border-blue-700/50"
                                    : "hover:bg-slate-700/30"
                                } ${!isUnlocked ? "opacity-50" : ""}`}
                                onClick={() =>
                                  isUnlocked && openLecture(lecture)
                                }
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    {!isUnlocked ? (
                                      <Lock className="h-4 w-4 text-slate-500" />
                                    ) : isCompleted ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Play className="h-4 w-4 text-blue-400" />
                                    )}
                                    <div>
                                      <p className="font-medium text-sm text-white">
                                        {lecture.title}
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        5:30
                                      </p>
                                    </div>
                                  </div>
                                  {lecture.pdfNotes.length > 0 && (
                                    <FileText className="h-4 w-4 text-slate-500" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
