"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const User_constant_1 = require("../User/User.constant");
const Auth_model_1 = require("./Auth.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const SignUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield Auth_model_1.User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.ALREADY_REPORTED, "User already Exist. Please login");
    }
    const hashedPassword = yield bcrypt.hash(payload.password, 12);
    const userData = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        password: hashedPassword,
        role: User_constant_1.USER_ROLE.USER,
    };
    const result = yield Auth_model_1.User.create(userData);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield Auth_model_1.User.findOne({ email: payload.email });
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.ALREADY_REPORTED, "Please Registration first.");
    }
    const isPasswordValid = yield bcrypt.compare(payload.password, userData.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password incorrect! Try again.");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.tokenGenerator({
        email: payload.email,
        role: userData.role,
    }, config_1.default.jwt_access_token, config_1.default.jwt_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.tokenGenerator({
        email: payload.email,
        role: userData.role,
    }, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthServices = {
    SignUp,
    login,
};
