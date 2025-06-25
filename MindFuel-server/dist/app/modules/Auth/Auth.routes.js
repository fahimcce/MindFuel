"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validRequest_1.default)(Auth_validation_1.UserValidator), Auth_controller_1.AuthControllers.SignUp);
router.post("/login", (0, validRequest_1.default)(Auth_validation_1.LoginValidator), Auth_controller_1.AuthControllers.login);
exports.authRoutes = router;
