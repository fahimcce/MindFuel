import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { USER_ROLE } from "../User/User.constant";
import { Tlogin, TUser } from "./Auth.interface";
import { User } from "./Auth.model";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

const SignUp = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new ApiError(
      httpStatus.ALREADY_REPORTED,
      "User already Exist. Please login"
    );
  }

  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    password: hashedPassword,
    role: USER_ROLE.USER,
  };

  const result = await User.create(userData);
  return result;
};

const login = async (payload: Tlogin) => {
  const userData = await User.findOne({ email: payload.email });
  if (!userData) {
    throw new ApiError(
      httpStatus.ALREADY_REPORTED,
      "Please Registration first."
    );
  }

  const isPasswordValid: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordValid) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Password incorrect! Try again."
    );
  }

  const accessToken = jwtHelpers.tokenGenerator(
    {
      email: payload.email,
      role: userData.role,
    },
    config.jwt_access_token as Secret,
    config.jwt_expires_in as string
  );

  const refreshToken = jwtHelpers.tokenGenerator(
    {
      email: payload.email,
      role: userData.role,
    },
    config.jwt_refresh_token as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  SignUp,
  login,
};
