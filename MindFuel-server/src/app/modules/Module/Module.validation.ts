import { z } from "zod";

const CreateModuleValidator = z.object({
  body: z.object({
    courseId: z.string().length(24, "Invalid course ID"),
    title: z.string().min(1, "Title is required"),
    lectures: z.array(z.string().length(24, "Invalid lecture ID")).optional(),
  }),
});

const UpdateModuleValidator = z.object({
  body: z.object({
    courseId: z.string().length(24, "Invalid course ID").optional(),
    title: z.string().min(1, "Title is required").optional(),
    moduleNumber: z.number().min(1, "Module number is required").optional(),
    lectures: z.array(z.string().length(24, "Invalid lecture ID")).optional(),
  }),
});

export const ModuleValidator = {
  CreateModuleValidator,
  UpdateModuleValidator,
};
