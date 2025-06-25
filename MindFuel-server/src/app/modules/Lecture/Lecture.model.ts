import { model, Schema } from "mongoose";
import { TLecture } from "./Lecture.interface";

const lectureSchema = new Schema<TLecture>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfNotes: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Lecture = model<TLecture>("Lecture", lectureSchema);
