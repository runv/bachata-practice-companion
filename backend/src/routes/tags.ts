import { Router } from 'express';
import { addTags, getTags } from '../controllers/tagController';

const router = Router();

router.get('/', getTags);
router.post('/', addTags);

export default router;
