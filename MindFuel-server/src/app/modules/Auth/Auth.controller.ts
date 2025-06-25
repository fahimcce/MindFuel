import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import httpStatus from "http-status";

const SignUp = catchAsync(async (req, res) => {
  const result = await AuthServices.SignUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login successfully",
    data: result,
  });
});

export const AuthControllers = {
  SignUp,
  login,
};
