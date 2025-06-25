import { z } from "zod";

export const LectureProgressValidator = z.object({
  body: z.object({
    userId: z.string().length(24, "Invalid user ID"),
    courseId: z.string().length(24, "Invalid course ID"),
    completedLectures: z.array(z.string().length(24, "Invalid lecture ID")),
    lastUnlockedLecture: z.string().length(24, "Invalid lecture ID").optional(),
  }),
});
