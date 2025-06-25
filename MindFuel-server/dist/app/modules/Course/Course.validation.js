"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
const CreateCourseValidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        thumbnail: zod_1.z.string(),
        price: zod_1.z.number().min(0, "Price must be non-negative"),
        description: zod_1.z.string().min(1, "Description is required"),
        modules: zod_1.z.array(zod_1.z.string().length(24, "Invalid module ID")).optional(),
    }),
});
const UpdateCourseValidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").optional(),
        thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL").optional(),
        price: zod_1.z.number().min(0, "Price must be non-negative").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        modules: zod_1.z.array(zod_1.z.string().length(24, "Invalid module ID")).optional(),
    }),
});
exports.CourseValidation = {
    CreateCourseValidator,
    UpdateCourseValidator,
};
