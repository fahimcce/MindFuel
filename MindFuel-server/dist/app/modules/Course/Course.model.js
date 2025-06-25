"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    PurshasedUsers: { type: [String], default: [] },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
courseSchema.virtual("modules", {
    ref: "Module",
    localField: "_id",
    foreignField: "courseId",
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
