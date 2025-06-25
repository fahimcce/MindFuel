import mongoose from "mongoose";

export type TLecture = {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  isDeleted: boolean;
  isLocked: boolean;
};
