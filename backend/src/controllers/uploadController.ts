import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { saveVideoMetadata, VideoMetadata } from '../models/videoModel';
import { addTags } from '../models/tagModel';


export const handleUpload = (req: Request, res: Response) => {
  const file = req.file;
  const { style, level, name, tags } = req.body;

  if (!file) return res.status(400).send('No file uploaded');
   
  const jsonTags = JSON.parse(tags); 
  //const tagsArray =  tags ? tags.split(',').map((t:string) => t.trim()).filter(Boolean) : [];

  const metadata: VideoMetadata = {
    id: randomUUID(),
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    style,
    level,
    name: name || file.originalname,
    uploadedAt: new Date().toISOString(),
    tags: jsonTags
  };

  saveVideoMetadata(metadata);
  addTags(jsonTags);
  res.status(200).json({ message: 'Upload successful', metadata });
};
