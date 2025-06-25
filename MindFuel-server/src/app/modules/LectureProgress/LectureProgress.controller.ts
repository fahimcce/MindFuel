import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LectureProgressService } from "./LectureProgress.service";
import httpStatus from "http-status";

const createLectureProgress = catchAsync(async (req, res) => {
  const result = await LectureProgressService.createLectureProgress(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture progress created successfully",
    data: result,
  });
});

const getLectureProgressByUserAndCourse = catchAsync(async (req, res) => {
  const { userId, courseId } = req.params;
  const result = await LectureProgressService.getLectureProgressByUserAndCourse(
    userId,
    courseId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lecture progress fetched successfully",
    data: result,
  });
});

export const LectureProgressController = {
  createLectureProgress,
  getLectureProgressByUserAndCourse,
};
