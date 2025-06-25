"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureProgressValidator = void 0;
const zod_1 = require("zod");
exports.LectureProgressValidator = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().length(24, "Invalid user ID"),
        courseId: zod_1.z.string().length(24, "Invalid course ID"),
        completedLectures: zod_1.z.array(zod_1.z.string().length(24, "Invalid lecture ID")),
        lastUnlockedLecture: zod_1.z.string().length(24, "Invalid lecture ID").optional(),
    }),
});
