import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Configure multer to store uploaded files in the 'uploads' folder
const upload = multer({ dest: 'uploads/' });

// Middleware for file upload
export const uploadMiddleware = upload.single('video');

// Convert AVI video to MP4 and return the new file path
export const convertVideo = async (inputPath: string): Promise<string> => {
    const outputPath = path.join('uploads', `${path.basename(inputPath, path.extname(inputPath))}.mp4`);

    // Convert the video and return a Promise that resolves with the MP4 path
    await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp4')
            .save(outputPath)
            .on('end', () => {
                // Clean up the input file after conversion
                fs.unlinkSync(inputPath);
                resolve();
            })
            .on('error', (err: Error) => {
                // Clean up in case of an error and reject the promise
                fs.unlinkSync(inputPath);
                reject(new Error('Failed to convert video to MP4 format'));
            });
    });

    return outputPath; // Return the path of the converted MP4 video
};