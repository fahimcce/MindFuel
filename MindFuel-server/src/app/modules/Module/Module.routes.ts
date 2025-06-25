import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { ModuleValidator } from "./Module.validation";
import { ModuleController } from "./Module.controller";

const router = express.Router();

router.post(
  "/create-module",
  validateRequest(ModuleValidator.CreateModuleValidator),
  ModuleController.createModule
);
router.get("/", ModuleController.getAllModules);
router.get("/:id", ModuleController.getModuleById);
router.patch(
  "/:id",
  validateRequest(ModuleValidator.UpdateModuleValidator),
  ModuleController.updateModule
);
router.delete("/:id", ModuleController.deleteModule);

export const moduleRoutes = router;
