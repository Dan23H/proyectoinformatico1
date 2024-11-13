import { Request, Response } from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

// Middleware for file upload
const uploadMiddleware = upload.single('video');

// Video conversion logic wrapped in a Promise
const convertVideo = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).send({ error: 'No file uploaded' });
        return;
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${req.file.filename}.mp4`);
    console.log("File uploaded and sent to ffmpeg!")
    try {
        // Return a promise that resolves when ffmpeg finishes the conversion
        await new Promise<void>((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat('mp4')
                .save(outputPath)
                .on('end', () => {
                    res.download(outputPath, (err) => {
                        if (err) {
                            reject(new Error('Failed to download file'));
                        } else {
                            // Cleanup
                            fs.unlinkSync(inputPath);
                            fs.unlinkSync(outputPath);
                            resolve();
                        }
                    });
                })
                .on('error', (err: Error) => {  // Explicitly typing err as Error
                    reject(new Error('Failed to convert file'));
                    fs.unlinkSync(inputPath); // Clean up the uploaded file
                });
        });
    } catch (err: any) {  // Type the caught error as 'any' to avoid TypeScript error
        res.status(500).send({ error: err.message });
    }
};

export default {
    uploadMiddleware,
    convertVideo,
};