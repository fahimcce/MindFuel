import httpStatus from "http-status";
import { TModule } from "./Module.interface";
import { Module } from "./Module.model";
import ApiError from "../../errors/ApiError";
import { getNextModuleNumber } from "../../helpers/moduleNumber";

const createModule = async (payload: TModule) => {
  const moduleNumber = await getNextModuleNumber(payload.courseId);
  const result = await Module.create({ ...payload, moduleNumber });
  return result;
};

const getAllModules = async () => {
  return Module.find().populate("lectures");
};

const getModuleById = async (id: string) => {
  const module = await Module.findById(id).populate("lectures");
  if (!module) throw new ApiError(httpStatus.NOT_FOUND, "Module not found");
  return module;
};

const updateModule = async (id: string, payload: Partial<TModule>) => {
  const module = await Module.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!module) throw new ApiError(httpStatus.NOT_FOUND, "Module not found");
  return module;
};

const deleteModule = async (id: string) => {
  const module = await Module.findByIdAndDelete(id);
  if (!module) throw new ApiError(httpStatus.NOT_FOUND, "Module not found");
  return module;
};

export const ModuleService = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule, // export the delete function
};
