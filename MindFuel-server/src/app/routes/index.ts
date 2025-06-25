import express from "express";
import { authRoutes } from "../modules/Auth/Auth.routes";
import { userRoutes } from "../modules/User/User.routes";
import { courseRoutes } from "../modules/Course/Course.routes";
import { lectureRoutes } from "../modules/Lecture/Lecture.routes";
import { moduleRoutes } from "../modules/Module/Module.routes";
import { lectureProgressRoutes } from "../modules/LectureProgress/LectureProgress.routes";

const router = express.Router();

const moudleRoute = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/lecture",
    route: lectureRoutes,
  },
  {
    path: "/module",
    route: moduleRoutes,
  },
  {
    path: "/progress",
    route: lectureProgressRoutes,
  },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
