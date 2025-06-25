import { Request } from "express";
import { TUser } from "../Auth/Auth.interface";
import { User } from "../Auth/Auth.model";
import { Course } from "../Course/Course.model";

const getAllUsers = async () => {
  const users = await User.find({});
  const result = users.map((user) => ({
    name: user.name,
    phone: user.phone,
    role: user.role,
    isDeleted: user.isDeleted,
  }));
  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const myCourses = async (req: Request) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not authenticated");
  }
  const userEmail = user.email;
  if (!userEmail) {
    throw new Error("User email not found");
  }

  const courses = await Course.find({ PurshasedUsers: userEmail });
  return courses;
};

export const UserServices = {
  getAllUsers,
  updateUser,
  myCourses, // export the new service
};
