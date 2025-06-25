"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
moduleSchema.virtual("lectures", {
    ref: "Lecture",
    localField: "_id",
    foreignField: "moduleId",
});
exports.Module = (0, mongoose_1.model)("Module", moduleSchema);
