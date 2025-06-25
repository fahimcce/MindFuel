"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureProgress = void 0;
const mongoose_1 = require("mongoose");
const lectureProgressSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLectures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Lecture" }],
    lastUnlockedLecture: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lecture" },
}, { timestamps: true });
exports.LectureProgress = (0, mongoose_1.model)("LectureProgress", lectureProgressSchema);
