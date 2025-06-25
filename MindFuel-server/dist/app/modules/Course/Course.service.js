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
exports.CourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Course_model_1 = require("./Course.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Course_model_1.Course.create(payload);
    return result;
});
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.find().populate({
        path: "modules",
        populate: {
            path: "lectures",
        },
    });
});
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_model_1.Course.findById(id).populate({
        path: "modules",
        populate: {
            path: "lectures",
        },
    });
    if (!course)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    return course;
});
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_model_1.Course.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!course)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    return course;
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_model_1.Course.findByIdAndDelete(id);
    if (!course)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    return course;
});
const purshaseUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User not authenticated");
    }
    const userEmail = user.email;
    const { courseId } = req.body;
    if (!courseId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Course ID is required");
    }
    const course = yield Course_model_1.Course.findByIdAndUpdate(courseId, { $addToSet: { PurshasedUsers: userEmail } }, { new: true });
    if (!course)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    return course;
});
exports.CourseService = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    purshaseUser,
};
