import mongoose from "mongoose";

export type TUserRole = "admin" | "user";
export type TUser = {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: TUserRole;
  enrolledCourses: [mongoose.Types.ObjectId];
  isDeleted: boolean;
};

export type Tlogin = {
  email: string;
  password: string;
};
