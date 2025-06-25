import httpStatus from "http-status";
import { TLecture } from "./Lecture.interface";
import { Lecture } from "./Lecture.model";
import ApiError from "../../errors/ApiError";

const createLecture = async (payload: TLecture) => {
  // Check if this is the first lecture in the module
  const lectureCount = await Lecture.countDocuments({
    moduleId: payload.moduleId,
  });

  // If it's the first lecture, unlock it
  const isLocked = lectureCount === 0 ? false : true;

  const result = await Lecture.create({ ...payload, isLocked });
  return result;
};

const getAllLectures = async () => {
  return Lecture.find();
};

const getLectureById = async (id: string) => {
  const lecture = await Lecture.findById(id);
  if (!lecture) throw new ApiError(httpStatus.NOT_FOUND, "Lecture not found");
  return lecture;
};

const updateLecture = async (id: string, payload: Partial<TLecture>) => {
  const lecture = await Lecture.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!lecture) throw new ApiError(httpStatus.NOT_FOUND, "Lecture not found");
  return lecture;
};

const deleteLecture = async (id: string) => {
  const lecture = await Lecture.findByIdAndDelete(id);
  if (!lecture) throw new ApiError(httpStatus.NOT_FOUND, "Lecture not found");
  return lecture;
};

export const LectureService = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture, // export the delete
};
