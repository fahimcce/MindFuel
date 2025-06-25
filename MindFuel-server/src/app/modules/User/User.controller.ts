import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./User.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users fetched successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});
const myCourses = catchAsync(async (req, res) => {
  const result = await UserServices.myCourses(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My courses fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  updateUser,
  myCourses, // export the new controller
};
