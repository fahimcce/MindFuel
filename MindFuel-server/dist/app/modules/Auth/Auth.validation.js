"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = exports.UserValidator = void 0;
const zod_1 = require("zod");
exports.UserValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    }),
});
exports.LoginValidator = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    }),
});
