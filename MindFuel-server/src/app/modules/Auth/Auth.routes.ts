import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { LoginValidator, UserValidator } from "./Auth.validation";
import { AuthControllers } from "./Auth.controller";

const router = express.Router();

router.post("/signup", validateRequest(UserValidator), AuthControllers.SignUp);

router.post("/login", validateRequest(LoginValidator), AuthControllers.login);

export const authRoutes = router;
