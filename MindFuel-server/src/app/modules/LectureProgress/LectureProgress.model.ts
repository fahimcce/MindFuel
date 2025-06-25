import { model, Schema } from "mongoose";
import { TLectureProgress } from "./LectureProgress.interface";

const lectureProgressSchema = new Schema<TLectureProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    lastUnlockedLecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  },
  { timestamps: true }
);

export const LectureProgress = model<TLectureProgress>(
  "LectureProgress",
  lectureProgressSchema
);
