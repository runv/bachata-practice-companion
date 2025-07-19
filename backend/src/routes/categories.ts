import { Router } from 'express';
import { fetchCategories, createCategory } from '../controllers/categoryController';

const router = Router();

router.get('/', fetchCategories);
router.post('/', createCategory);

export default router;
