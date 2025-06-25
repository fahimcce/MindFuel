"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_routes_1 = require("../modules/Auth/Auth.routes");
const User_routes_1 = require("../modules/User/User.routes");
const Course_routes_1 = require("../modules/Course/Course.routes");
const Lecture_routes_1 = require("../modules/Lecture/Lecture.routes");
const Module_routes_1 = require("../modules/Module/Module.routes");
const LectureProgress_routes_1 = require("../modules/LectureProgress/LectureProgress.routes");
const router = express_1.default.Router();
const moudleRoute = [
    {
        path: "/auth",
        route: Auth_routes_1.authRoutes,
    },
    {
        path: "/user",
        route: User_routes_1.userRoutes,
    },
    {
        path: "/course",
        route: Course_routes_1.courseRoutes,
    },
    {
        path: "/lecture",
        route: Lecture_routes_1.lectureRoutes,
    },
    {
        path: "/module",
        route: Module_routes_1.moduleRoutes,
    },
    {
        path: "/progress",
        route: LectureProgress_routes_1.lectureProgressRoutes,
    },
];
moudleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
