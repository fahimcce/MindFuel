import httpStatus from "http-status";
import { TCourse } from "./Course.interface";
import { Course } from "./Course.model";
import ApiError from "../../errors/ApiError";
import { Request } from "express";

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async () => {
  return Course.find().populate({
    path: "modules",
    populate: {
      path: "lectures",
    },
  });
};

const getCourseById = async (id: string) => {
  const course = await Course.findById(id).populate({
    path: "modules",
    populate: {
      path: "lectures",
    },
  });
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const course = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

const deleteCourse = async (id: string) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

const purshaseUser = async (req: Request) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }
  const userEmail = user.email;

  const { courseId } = req.body;
  if (!courseId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Course ID is required");
  }
  const course = await Course.findByIdAndUpdate(
    courseId,
    { $addToSet: { PurshasedUsers: userEmail } },
    { new: true }
  );
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  purshaseUser,
};
