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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const Auth_model_1 = require("../Auth/Auth.model");
const Course_model_1 = require("../Course/Course.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Auth_model_1.User.find({});
    const result = users.map((user) => ({
        name: user.name,
        phone: user.phone,
        role: user.role,
        isDeleted: user.isDeleted,
    }));
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const myCourses = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("User not authenticated");
    }
    const userEmail = user.email;
    if (!userEmail) {
        throw new Error("User email not found");
    }
    const courses = yield Course_model_1.Course.find({ PurshasedUsers: userEmail });
    return courses;
});
exports.UserServices = {
    getAllUsers,
    updateUser,
    myCourses, // export the new service
};
