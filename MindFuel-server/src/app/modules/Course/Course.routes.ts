import express from "express";
import validateRequest from "../../middlewares/validRequest";

import { CourseController } from "./Course.controller";
import { CourseValidation } from "./Course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/User.constant";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.CreateCourseValidator),
  CourseController.createCourse
);
router.post(
  "/purchase",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CourseController.purshaseUser
);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);
router.patch(
  "/:id",
  validateRequest(CourseValidation.UpdateCourseValidator),
  CourseController.updateCourse
);
router.delete("/:id", CourseController.deleteCourse);

export const courseRoutes = router;
