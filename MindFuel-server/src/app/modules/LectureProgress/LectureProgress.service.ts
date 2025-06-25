import httpStatus from "http-status";
import { TLectureProgress } from "./LectureProgress.interface";
import { LectureProgress } from "./LectureProgress.model";
import ApiError from "../../errors/ApiError";

const createLectureProgress = async (payload: TLectureProgress) => {
  const result = await LectureProgress.create(payload);
  return result;
};

const getLectureProgressByUserAndCourse = async (
  userId: string,
  courseId: string
) => {
  const progress = await LectureProgress.findOne({ userId, courseId });
  if (!progress) throw new ApiError(httpStatus.NOT_FOUND, "Progress not found");
  return progress;
};

export const LectureProgressService = {
  createLectureProgress,
  getLectureProgressByUserAndCourse,
};
