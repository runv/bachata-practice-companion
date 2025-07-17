import { Request, Response } from 'express';
import { saveVideoMetadata } from '../models/videoModel';

export const handleUpload = (req: Request, res: Response) => {
  const file = req.file;
  const { style, level } = req.body;

  if (!file) return res.status(400).send('No file uploaded');

  const metadata = {
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    style,
    level,
    uploadedAt: new Date().toISOString()
  };

  saveVideoMetadata(metadata);
  res.status(200).json({ message: 'Upload successful', metadata });
};
