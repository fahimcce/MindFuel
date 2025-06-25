"use strict";
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
exports.ModuleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Module_model_1 = require("./Module.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const moduleNumber_1 = require("../../helpers/moduleNumber");
const createModule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const moduleNumber = yield (0, moduleNumber_1.getNextModuleNumber)(payload.courseId);
    const result = yield Module_model_1.Module.create(Object.assign(Object.assign({}, payload), { moduleNumber }));
    return result;
});
const getAllModules = () => __awaiter(void 0, void 0, void 0, function* () {
    return Module_model_1.Module.find().populate("lectures");
});
const getModuleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield Module_model_1.Module.findById(id).populate("lectures");
    if (!module)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Module not found");
    return module;
});
const updateModule = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield Module_model_1.Module.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!module)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Module not found");
    return module;
});
const deleteModule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield Module_model_1.Module.findByIdAndDelete(id);
    if (!module)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Module not found");
    return module;
});
exports.ModuleService = {
    createModule,
    getAllModules,
    getModuleById,
    updateModule,
    deleteModule, // export the delete function
};
