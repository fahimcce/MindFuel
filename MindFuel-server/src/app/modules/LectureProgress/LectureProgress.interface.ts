import mongoose from "mongoose";

export type TLectureProgress = {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLectures: mongoose.Types.ObjectId[];
  lastUnlockedLecture?: mongoose.Types.ObjectId;
};
