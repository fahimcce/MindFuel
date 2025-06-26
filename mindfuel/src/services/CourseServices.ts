import axiosInstance from "@/lib/axiosInstance";
import { TCourseReq, TPurchase } from "@/types";

export const GetAllCourses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course`, {
      next: {
        revalidate: 60 * 3, // 3 minutes stale-while-revalidate
        tags: ["courses"], // for on-demand revalidation
      },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Fetching courses failed:", error);
    throw error;
  }
};

export const MyCourses = async () => {
  try {
    const response = await axiosInstance.get(`/user/my-courses`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const GetSingleCourses = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Course Not found !!");
  }
  const result = await res.json();
  return result.data;
};

export const CreateCourse = async (data: TCourseReq) => {
  try {
    const response = await axiosInstance.post(`/course/create-course`, data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const DeleteCourse = async (id: string) => {
  const response = await axiosInstance.delete(`/course/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete Course.");
  }

  return response.data?.message;
};

export const UpdateCourse = async (
  id: string,
  payload: Partial<TCourseReq>
) => {
  const response = await axiosInstance.patch(`/course/${id}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update course.");
  }

  return response.data?.message;
};

export const PurchasedCourse = async (payload: TPurchase) => {
  const response = await axiosInstance.post(`/course/purchase`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to Purchase course.");
  }

  return response.data?.message;
};
