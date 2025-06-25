import { z } from "zod";

const CreateCourseValidator = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    thumbnail: z.string(),
    price: z.number().min(0, "Price must be non-negative"),
    description: z.string().min(1, "Description is required"),
    modules: z.array(z.string().length(24, "Invalid module ID")).optional(),
  }),
});
const UpdateCourseValidator = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    price: z.number().min(0, "Price must be non-negative").optional(),
    description: z.string().min(1, "Description is required").optional(),
    modules: z.array(z.string().length(24, "Invalid module ID")).optional(),
  }),
});

export const CourseValidation = {
  CreateCourseValidator,
  UpdateCourseValidator,
};
