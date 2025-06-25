import mongoose from "mongoose";

export type TModule = {
  courseId: mongoose.Types.ObjectId;
  title: string;
  moduleNumber: number;
  isDeleted: boolean;
};
