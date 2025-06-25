"use server";
import axiosInstance from "@/lib/axiosInstance";
import { TLogin, TSignUp } from "@/types";

export const login = async (payload: TLogin) => {
  const response = await axiosInstance.post("/auth/login", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Login failed.");
  }
  return response.data.data;
};

export const registration = async (payload: TSignUp) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Registration failed.");
  }
  return response.data.data;
};
