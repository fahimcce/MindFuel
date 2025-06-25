import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LectureService } from "./Lecture.service";
import httpStatus from "http-status";

const createLecture = catchAsync(async (req, res) => {
  const result = await LectureService.createLecture(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture created successfully",
    data: result,
  });
});

const getAllLectures = catchAsync(async (req, res) => {
  const result = await LectureService.getAllLectures();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lectures fetched successfully",
    data: result,
  });
});

const getLectureById = catchAsync(async (req, res) => {
  const result = await LectureService.getLectureById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture fetched successfully",
    data: result,
  });
});

const updateLecture = catchAsync(async (req, res) => {
  const result = await LectureService.updateLecture(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture updated successfully",
    data: result,
  });
});

const deleteLecture = catchAsync(async (req, res) => {
  const result = await LectureService.deleteLecture(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture deleted successfully",
    data: result,
  });
});

export const LectureController = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture, // export the delete controller
};
