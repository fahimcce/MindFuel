"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Lecture_model_1 = require("./Lecture.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createLecture = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if this is the first lecture in the module
    const lectureCount = yield Lecture_model_1.Lecture.countDocuments({
        moduleId: payload.moduleId,
    });
    // If it's the first lecture, unlock it
    const isLocked = lectureCount === 0 ? false : true;
    const result = yield Lecture_model_1.Lecture.create(Object.assign(Object.assign({}, payload), { isLocked }));
    return result;
});
const getAllLectures = () => __awaiter(void 0, void 0, void 0, function* () {
    return Lecture_model_1.Lecture.find();
});
const getLectureById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield Lecture_model_1.Lecture.findById(id);
    if (!lecture)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Lecture not found");
    return lecture;
});
const updateLecture = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield Lecture_model_1.Lecture.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!lecture)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Lecture not found");
    return lecture;
});
const deleteLecture = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield Lecture_model_1.Lecture.findByIdAndDelete(id);
    if (!lecture)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Lecture not found");
    return lecture;
});
exports.LectureService = {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture, // export the delete
};
