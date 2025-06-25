import axiosInstance from "@/lib/axiosInstance";
import { TLectureReq } from "@/types";

export const GetAllLectures = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/lecture`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Data fetching failed !!");
  }
  const result = await res.json();
  return result.data;
};

export const CreateLecture = async (data: TLectureReq) => {
  try {
    const response = await axiosInstance.post(`/lecture/create-lecture`, data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const DeleteLecture = async (id: string) => {
  const response = await axiosInstance.delete(`/lecture/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete lecture.");
  }

  return response.data?.message;
};

export const UpdateLecture = async (
  id: string,
  payload: Partial<TLectureReq>
) => {
  const response = await axiosInstance.patch(`/lecture/${id}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update lecture.");
  }

  return response.data?.message;
};
