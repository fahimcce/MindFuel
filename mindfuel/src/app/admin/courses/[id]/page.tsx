"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/FindUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetSingleCourses } from "@/services/CourseServices";
import {
  CreateModule,
  DeleteModule,
  UpdateModule,
} from "@/services/ModuleServices";
import {
  CreateLecture,
  UpdateLecture,
  DeleteLecture,
} from "@/services/LectureServices";
import ModuleList from "@/components/admin/ModuleList";
import ModuleDialog from "@/components/admin/ModuleDialog";
import LectureDialog from "@/components/admin/LectureDialog";
import { TLecture, TModule } from "@/types";

export default function CourseManagement() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const queryClient = useQueryClient();

  // Fetch course (with modules and lectures)
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => GetSingleCourses(courseId),
    staleTime: 1000 * 60 * 2,
    enabled: !!courseId,
  });

  // Dialog states
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [lectureDialogOpen, setLectureDialogOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState("");

  // Form states
  const [moduleFormData, setModuleFormData] = useState({ title: "" });
  const [lectureFormData, setLectureFormData] = useState({
    title: "",
    videoUrl: "",
    pdfNotes: "",
  });

  // Module edit states
  const [editingModuleId, setEditingModuleId] = useState("");
  const [editModuleTitle, setEditModuleTitle] = useState("");

  // Lecture edit states
  const [editingLectureId, setEditingLectureId] = useState("");
  const [editLectureData, setEditLectureData] = useState({
    title: "",
    videoUrl: "",
    pdfNotes: "",
  });

  // --- MODULE MUTATIONS ---
  const createModuleMutation = useMutation({
    mutationFn: (data: { courseId: string; title: string }) =>
      CreateModule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Module created successfully!");
      setModuleDialogOpen(false);
      setModuleFormData({ title: "" });
    },
    onError: () => {
      toast.error("Failed to create module");
    },
  });

  const deleteModuleMutation = useMutation({
    mutationFn: (id: string) => DeleteModule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Module deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete module");
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { title: string } }) =>
      UpdateModule(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Module updated successfully!");
      setEditingModuleId("");
      setEditModuleTitle("");
    },
    onError: () => {
      toast.error("Failed to update module");
    },
  });

  // --- LECTURE MUTATIONS ---
  const createLectureMutation = useMutation({
    mutationFn: (data: {
      moduleId: string;
      title: string;
      videoUrl: string;
      pdfNotes: string[];
    }) => CreateLecture(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Lecture created successfully!");
      setLectureDialogOpen(false);
      setLectureFormData({ title: "", videoUrl: "", pdfNotes: "" });
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to create lecture");
    },
  });

  const updateLectureMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { title?: string; videoUrl?: string; pdfNotes?: string[] };
    }) => UpdateLecture(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Lecture updated successfully!");
      setEditingLectureId("");
      setEditLectureData({ title: "", videoUrl: "", pdfNotes: "" });
    },
    onError: () => {
      toast.error("Failed to update lecture");
    },
  });

  const deleteLectureMutation = useMutation({
    mutationFn: (id: string) => DeleteLecture(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Lecture deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete lecture");
    },
  });

  // --- HANDLERS ---
  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    createModuleMutation.mutate({
      courseId,
      title: moduleFormData.title,
    });
  };

  const handleUpdateModule = (e: React.FormEvent) => {
    e.preventDefault();
    updateModuleMutation.mutate({
      id: editingModuleId,
      payload: { title: editModuleTitle },
    });
  };

  const handleCreateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    createLectureMutation.mutate({
      moduleId: selectedModuleId,
      title: lectureFormData.title,
      videoUrl: lectureFormData.videoUrl,
      pdfNotes: lectureFormData.pdfNotes
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
    });
  };

  const handleEditLecture = (lecture: TLecture) => {
    setEditingLectureId(lecture._id);
    setEditLectureData({
      title: lecture.title,
      videoUrl: lecture.videoUrl,
      pdfNotes: (lecture.pdfNotes || []).join("\n"),
    });
  };

  const handleUpdateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    updateLectureMutation.mutate({
      id: editingLectureId,
      payload: {
        title: editLectureData.title,
        videoUrl: editLectureData.videoUrl,
        pdfNotes: editLectureData.pdfNotes
          .split("\n")
          .map((url) => url.trim())
          .filter(Boolean),
      },
    });
  };

  // --- RENDER ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Course not found
          </h2>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300"
          >
            Back to Dashboard
          </Link>
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
              <Link href="/admin">
                <button className="flex items-center text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
              </Link>
              <BookOpen className="h-8 w-8 text-blue-400 ml-4" />
              <span className="ml-2 text-xl font-bold text-white">
                {course.title}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Info */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-48 h-32 object-cover rounded-lg border border-slate-700/50"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {course.title}
              </h1>
              <p className="text-slate-400 mb-4">{course.description}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-lg font-medium border border-blue-500/30">
                ৳ {course.price}
              </span>
            </div>
          </div>
        </div>

        {/* Modules & Lectures */}
        <div className="space-y-6">
          <div className="flex border-b border-slate-700/50">
            <button className="px-4 py-2 text-sm font-medium text-white border-b-2 border-blue-500">
              Modules & Lectures
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Modules</h2>
              <button
                onClick={() => setModuleDialogOpen(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </button>
            </div>

            {!course.modules || course.modules.length === 0 ? (
              <div className="p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
                <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No modules yet
                </h3>
                <p className="text-slate-400">
                  Start organizing your course by creating modules.
                </p>
              </div>
            ) : (
              <ModuleList
                modules={course.modules}
                onEdit={(id, title) => {
                  setEditingModuleId(id);
                  setEditModuleTitle(title);
                }}
                onDelete={(id) => deleteModuleMutation.mutate(id)}
                onAddLecture={(moduleId) => {
                  setSelectedModuleId(moduleId);
                  setLectureDialogOpen(true);
                }}
                editingModuleId={editingModuleId}
                editModuleTitle={editModuleTitle}
                setEditModuleTitle={setEditModuleTitle}
                handleUpdateModule={handleUpdateModule}
                setEditingModuleId={setEditingModuleId}
                handleEditLecture={handleEditLecture}
                editingLectureId={editingLectureId}
                editLectureData={editLectureData}
                setEditLectureData={setEditLectureData}
                handleUpdateLecture={handleUpdateLecture}
                deleteLectureMutation={deleteLectureMutation}
              />
            )}
          </div>
        </div>

        {/* Module Creation Dialog */}
        <ModuleDialog
          open={moduleDialogOpen}
          onClose={() => setModuleDialogOpen(false)}
          onSubmit={handleCreateModule}
          formData={moduleFormData}
          setFormData={setModuleFormData}
          loading={createModuleMutation.isPending}
        />

        {/* Lecture Creation Dialog */}
        <LectureDialog
          open={lectureDialogOpen}
          onClose={() => setLectureDialogOpen(false)}
          onSubmit={handleCreateLecture}
          formData={lectureFormData}
          setFormData={setLectureFormData}
          loading={createLectureMutation.isPending}
        />
      </div>
    </div>
  );
}
