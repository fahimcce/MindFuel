"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const Lecture_validation_1 = require("./Lecture.validation");
const Lecture_controller_1 = require("./Lecture.controller");
const router = express_1.default.Router();
router.post("/create-lecture", (0, validRequest_1.default)(Lecture_validation_1.LectureValidator.CreateLectureValidator), Lecture_controller_1.LectureController.createLecture);
router.get("/", Lecture_controller_1.LectureController.getAllLectures);
router.get("/:id", Lecture_controller_1.LectureController.getLectureById);
router.patch("/:id", (0, validRequest_1.default)(Lecture_validation_1.LectureValidator.UpdateLectureValidator), Lecture_controller_1.LectureController.updateLecture);
router.delete("/:id", Lecture_controller_1.LectureController.deleteLecture);
exports.lectureRoutes = router;
