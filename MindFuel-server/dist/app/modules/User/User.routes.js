"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("./User.constant");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(User_constant_1.USER_ROLE.ADMIN), User_controller_1.UserControllers.getAllUsers);
router.patch("/:id", (0, auth_1.default)(User_constant_1.USER_ROLE.ADMIN), User_controller_1.UserControllers.updateUser);
router.get("/my-courses", (0, auth_1.default)(User_constant_1.USER_ROLE.USER, User_constant_1.USER_ROLE.ADMIN), User_controller_1.UserControllers.myCourses);
exports.userRoutes = router;
