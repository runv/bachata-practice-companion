import { Request, Response } from 'express';
import * as tagModel from '../models/tagModel';

export const getTags = async (_req: Request, res: Response) => {
  try {
    const tags = await tagModel.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error('Failed to load tags:', error);
    res.status(500).json({ error: 'Failed to load tags' });
  }
};

export const addTags = async (req: Request, res: Response) => {
  try {
    const newTags: string[] = req.body.tags;
    if (!Array.isArray(newTags)) {
      return res.status(400).json({ error: 'Tags must be an array of strings.' });
    }

    const updated = await tagModel.addTags(newTags);
    res.json({ tags: updated });
  } catch (error) {
    console.error('Failed to save tags:', error);
    res.status(500).json({ error: 'Failed to save tags' });
  }
};
