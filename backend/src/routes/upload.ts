import { Router } from 'express';
import multer from '../middleware/multerConfig';
import { handleUpload } from '../controllers/uploadController';

const router = Router();
router.post('/', multer.single('video'), handleUpload);

export default router;
