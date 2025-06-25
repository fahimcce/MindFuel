import express from "express";
import { UserControllers } from "./User.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./User.constant";
const router = express.Router();

router.get("/", auth(USER_ROLE.ADMIN), UserControllers.getAllUsers);
router.patch("/:id", auth(USER_ROLE.ADMIN), UserControllers.updateUser);
router.get(
  "/my-courses",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  UserControllers.myCourses
);

export const userRoutes = router;
