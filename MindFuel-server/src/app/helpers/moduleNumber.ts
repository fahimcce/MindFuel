import mongoose from "mongoose";
import { Module } from "../modules/Module/Module.model";

export const getNextModuleNumber = async (
  courseId: string | mongoose.Types.ObjectId
) => {
  const lastModule = await Module.findOne({ courseId })
    .sort({ moduleNumber: -1 })
    .lean();
  return lastModule ? lastModule.moduleNumber + 1 : 1;
};
