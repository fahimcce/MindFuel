"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureValidator = void 0;
const zod_1 = require("zod");
const CreateLectureValidator = zod_1.z.object({
    body: zod_1.z.object({
        moduleId: zod_1.z.string().length(24, "Invalid module ID"),
        title: zod_1.z.string().min(1, "Title is required"),
        videoUrl: zod_1.z.string().url("Invalid video URL"),
        pdfNotes: zod_1.z.array(zod_1.z.string()).optional().default([]),
    }),
});
const UpdateLectureValidator = zod_1.z.object({
    body: zod_1.z.object({
        moduleId: zod_1.z.string().length(24, "Invalid module ID").optional(),
        title: zod_1.z.string().min(1, "Title is required").optional(),
        videoUrl: zod_1.z.string().url("Invalid video URL").optional(),
        pdfNotes: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.LectureValidator = {
    CreateLectureValidator,
    UpdateLectureValidator,
};
