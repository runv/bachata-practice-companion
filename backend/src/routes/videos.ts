import express from 'express';
import { getVideos, streamVideo } from '../controllers/videoController';

const router = express.Router();

router.get('/', getVideos);
router.get('/:filename', streamVideo);

export default router;
