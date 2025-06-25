import { z } from "zod";

const CreateLectureValidator = z.object({
  body: z.object({
    moduleId: z.string().length(24, "Invalid module ID"),
    title: z.string().min(1, "Title is required"),
    videoUrl: z.string().url("Invalid video URL"),
    pdfNotes: z.array(z.string()).optional().default([]),
  }),
});

const UpdateLectureValidator = z.object({
  body: z.object({
    moduleId: z.string().length(24, "Invalid module ID").optional(),
    title: z.string().min(1, "Title is required").optional(),
    videoUrl: z.string().url("Invalid video URL").optional(),
    pdfNotes: z.array(z.string()).optional(),
  }),
});

export const LectureValidator = {
  CreateLectureValidator,
  UpdateLectureValidator,
};
