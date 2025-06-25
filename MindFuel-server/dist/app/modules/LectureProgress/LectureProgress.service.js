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
exports.LectureProgressService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const LectureProgress_model_1 = require("./LectureProgress.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createLectureProgress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield LectureProgress_model_1.LectureProgress.create(payload);
    return result;
});
const getLectureProgressByUserAndCourse = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const progress = yield LectureProgress_model_1.LectureProgress.findOne({ userId, courseId });
    if (!progress)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Progress not found");
    return progress;
});
exports.LectureProgressService = {
    createLectureProgress,
    getLectureProgressByUserAndCourse,
};
