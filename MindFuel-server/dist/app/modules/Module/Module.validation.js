"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleValidator = void 0;
const zod_1 = require("zod");
const CreateModuleValidator = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string().length(24, "Invalid course ID"),
        title: zod_1.z.string().min(1, "Title is required"),
        lectures: zod_1.z.array(zod_1.z.string().length(24, "Invalid lecture ID")).optional(),
    }),
});
const UpdateModuleValidator = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string().length(24, "Invalid course ID").optional(),
        title: zod_1.z.string().min(1, "Title is required").optional(),
        moduleNumber: zod_1.z.number().min(1, "Module number is required").optional(),
        lectures: zod_1.z.array(zod_1.z.string().length(24, "Invalid lecture ID")).optional(),
    }),
});
exports.ModuleValidator = {
    CreateModuleValidator,
    UpdateModuleValidator,
};
