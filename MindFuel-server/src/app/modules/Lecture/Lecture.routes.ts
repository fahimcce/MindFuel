import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { LectureValidator } from "./Lecture.validation";
import { LectureController } from "./Lecture.controller";

const router = express.Router();

router.post(
  "/create-lecture",
  validateRequest(LectureValidator.CreateLectureValidator),
  LectureController.createLecture
);
router.get("/", LectureController.getAllLectures);
router.get("/:id", LectureController.getLectureById);
router.patch(
  "/:id",
  validateRequest(LectureValidator.UpdateLectureValidator),
  LectureController.updateLecture
);
router.delete("/:id", LectureController.deleteLecture);

export const lectureRoutes = router;
