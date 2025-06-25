import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./Course.service";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourses();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses fetched successfully",
    data: result,
  });
});

const getCourseById = catchAsync(async (req, res) => {
  const result = await CourseService.getCourseById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course fetched successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.updateCourse(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseService.deleteCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

const purshaseUser = catchAsync(async (req, res) => {
  const result = await CourseService.purshaseUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course purchased successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  purshaseUser,
};
