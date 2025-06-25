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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextModuleNumber = void 0;
const Module_model_1 = require("../modules/Module/Module.model");
const getNextModuleNumber = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const lastModule = yield Module_model_1.Module.findOne({ courseId })
        .sort({ moduleNumber: -1 })
        .lean();
    return lastModule ? lastModule.moduleNumber + 1 : 1;
});
exports.getNextModuleNumber = getNextModuleNumber;
