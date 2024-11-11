import express from 'express';
import videoController from '../controllers/videoController';

const router = express.Router();

// POST route to handle file upload and conversion
router.post('/convert',
     videoController.uploadMiddleware,
     videoController.convertVideo
);

export default router;