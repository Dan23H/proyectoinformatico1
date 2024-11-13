"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = __importDefault(require("../controllers/videoController"));
const router = express_1.default.Router();
// POST route to handle file upload and conversion
router.post('/convert', videoController_1.default.uploadMiddleware, videoController_1.default.convertVideo);
exports.default = router;
