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
const multer_1 = __importDefault(require("multer"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Middleware for file upload
const uploadMiddleware = upload.single('video');
// Video conversion logic wrapped in a Promise
const convertVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).send({ error: 'No file uploaded' });
        return;
    }
    const inputPath = req.file.path;
    const outputPath = path_1.default.join('uploads', `${req.file.filename}.mp4`);
    try {
        // Return a promise that resolves when ffmpeg finishes the conversion
        yield new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(inputPath)
                .toFormat('mp4')
                .save(outputPath)
                .on('end', () => {
                res.download(outputPath, (err) => {
                    if (err) {
                        reject(new Error('Failed to download file'));
                    }
                    else {
                        // Cleanup
                        fs_1.default.unlinkSync(inputPath);
                        fs_1.default.unlinkSync(outputPath);
                        resolve();
                    }
                });
            })
                .on('error', (err) => {
                reject(new Error('Failed to convert file'));
                fs_1.default.unlinkSync(inputPath); // Clean up the uploaded file
            });
        });
    }
    catch (err) { // Type the caught error as 'any' to avoid TypeScript error
        res.status(500).send({ error: err.message });
    }
});
exports.default = {
    uploadMiddleware,
    convertVideo,
};
