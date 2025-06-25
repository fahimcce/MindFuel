import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { LectureProgressValidator } from "./LectureProgress.validation";
import { LectureProgressController } from "./LectureProgress.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(LectureProgressValidator),
  LectureProgressController.createLectureProgress
);
router.get(
  "/:userId/:courseId",
  LectureProgressController.getLectureProgressByUserAndCourse
);

export const lectureProgressRoutes = router;
