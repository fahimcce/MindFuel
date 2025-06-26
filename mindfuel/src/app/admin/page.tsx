"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  BookOpen,
  Users,
  Video,
  BarChart3,
  LogOut,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { TCourse } from "@/types";
import { useAuth } from "@/context/FindUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetAllCourses,
  CreateCourse,
  DeleteCourse,
  UpdateCourse, // <-- import UpdateCourse
} from "@/services/CourseServices";
import CourseFormDialog from "@/components/admin/CourseFormDialog";
import Loader from "@/components/shared/Loader";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function AdminDashboard() {
  const { user, logOut } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TCourse | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: GetAllCourses,
    staleTime: 1000 * 60 * 2,
  });

  const createCourseMutation = useMutation({
    mutationFn: CreateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created successfully!");
      window.location.reload();
      setDialogOpen(false);
      setFormData({ title: "", description: "", price: "", thumbnail: "" });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: DeleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted successfully!");
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to delete course");
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TCourse> }) =>
      UpdateCourse(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated successfully!");
      window.location.reload();
      setDialogOpen(false);
      setEditingCourse(null);
      setFormData({ title: "", description: "", price: "", thumbnail: "" });
    },
    onError: () => {
      toast.error("Failed to update course");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCourse) {
        // Use mutation for updating course
        updateCourseMutation.mutate({
          id: editingCourse._id,
          payload: {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            thumbnail: formData.thumbnail,
          },
        });
        return;
      } else {
        createCourseMutation.mutate({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          thumbnail: formData.thumbnail,
        });
        return;
      }
    } catch (error) {
      toast.error("Failed to save course");
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    deleteCourseMutation.mutate(courseId);
  };

  const openEditDialog = (course: TCourse) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      thumbnail: course.thumbnail,
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCourse(null);
    setFormData({ title: "", description: "", price: "", thumbnail: "" });
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, </span>
              <button
                onClick={logOut}
                className="flex items-center cursor-pointer px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Courses Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Courses</h2>
          <button
            onClick={openCreateDialog}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </button>
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
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">
                      {course.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                      ৳ {course.price}
                    </span>
                  </div>
                  <p className="text-slate-400 line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/admin/courses/${course._id}`}>
                      <button className="px-3 cursor-pointer py-1 text-sm text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors">
                        Manage Content
                      </button>
                    </Link>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditDialog(course)}
                        className="p-2 cursor-pointer text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="p-2 cursor-pointer text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Form Dialog */}
        <CourseFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingCourse={editingCourse}
        />
      </div>
    </div>
  );
}
