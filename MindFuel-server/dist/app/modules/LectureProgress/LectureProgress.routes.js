"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureProgressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const LectureProgress_validation_1 = require("./LectureProgress.validation");
const LectureProgress_controller_1 = require("./LectureProgress.controller");
const router = express_1.default.Router();
router.post("/", (0, validRequest_1.default)(LectureProgress_validation_1.LectureProgressValidator), LectureProgress_controller_1.LectureProgressController.createLectureProgress);
router.get("/:userId/:courseId", LectureProgress_controller_1.LectureProgressController.getLectureProgressByUserAndCourse);
exports.lectureProgressRoutes = router;
