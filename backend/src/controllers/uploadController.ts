import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractThumbnail } from '../utils/extractThumbnail.js';
import { saveVideoMetadata, VideoMetadata } from '../models/videoModel';
import { addTags } from '../models/tagModel';

ffmpeg.setFfmpegPath(ffmpegPath as string);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, '../../storage/thumbnails/');


export const handleUpload = async (req: Request, res: Response) => {
  const file = req.file;
  const { style, level, name, tags } = req.body;

  if (!file) return res.status(400).send('No file uploaded');

  const { filename, path: videoPath } = file;

  const thumbnailName = filename.replace(path.extname(filename), '.jpg');
  const thumbnailPath = path.join(videoDir, thumbnailName);

  try {
    await extractThumbnail(videoPath, thumbnailPath);
   
    const jsonTags = JSON.parse(tags); 
    const metadata: VideoMetadata = {
        id: randomUUID(),
        filename: file.filename,
        originalname: file.originalname,
        name: name || file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        style,
        level,
        tags: jsonTags,
        thumbnail: thumbnailName,
        uploadedAt: new Date().toISOString(),
    };

    saveVideoMetadata(metadata);
    addTags(jsonTags);
    res.status(200).json({ message: 'Upload successful', metadata });
  } catch (err) {
    console.error('Upload processing failed:', err);
    res.status(500).json({ error: 'Failed to process video' });
  }
};
