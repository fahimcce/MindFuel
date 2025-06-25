"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const Module_validation_1 = require("./Module.validation");
const Module_controller_1 = require("./Module.controller");
const router = express_1.default.Router();
router.post("/create-module", (0, validRequest_1.default)(Module_validation_1.ModuleValidator.CreateModuleValidator), Module_controller_1.ModuleController.createModule);
router.get("/", Module_controller_1.ModuleController.getAllModules);
router.get("/:id", Module_controller_1.ModuleController.getModuleById);
router.patch("/:id", (0, validRequest_1.default)(Module_validation_1.ModuleValidator.UpdateModuleValidator), Module_controller_1.ModuleController.updateModule);
router.delete("/:id", Module_controller_1.ModuleController.deleteModule);
exports.moduleRoutes = router;
