import axiosInstance from "@/lib/axiosInstance";
import { TModuleReq } from "@/types";

export const GetAllModules = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/module`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Data fetching failed !!");
  }
  const result = await res.json();
  return result.data;
};

export const CreateModule = async (data: TModuleReq) => {
  try {
    const response = await axiosInstance.post(`/module/create-module`, data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const DeleteModule = async (id: string) => {
  const response = await axiosInstance.delete(`/module/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete Module.");
  }

  return response.data?.message;
};

export const UpdateModule = async (
  id: string,
  payload: Partial<TModuleReq>
) => {
  const response = await axiosInstance.patch(`/module/${id}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update module.");
  }

  return response.data?.message;
};
