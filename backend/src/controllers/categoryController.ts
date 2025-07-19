import { Request, Response } from 'express';
import { getCategories, addCategory } from '../models/categoryModel';

export const fetchCategories = async (_: Request, res: Response) => {
  const categories = await getCategories();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid category name' });
  }

  await addCategory(name);
  res.status(201).json({ success: true });
};
