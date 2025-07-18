import { Request, Response } from 'express';
import fsPromises from 'fs/promises';
import { stat } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { lookup } from 'mime-types';
import * as videoModel from '../models/videoModel';

const videoDir = path.resolve('storage/videos');

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await videoModel.getAllVideos();
    res.json(videos);
  } catch (error) {
    console.error('Failed to load video metadata:', error);
    res.status(500).json({ error: 'Failed to load videos' });
  }
};

export const streamVideo = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(videoDir, filename);

  try {
    const fileStat = await stat(filePath);
    const fileSize = fileStat.size;
    const range = req.headers.range;
    const mimeType = lookup(filePath) || 'application/octet-stream';

    if (!range) {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': mimeType,
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const stream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
    });

    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(404).send('Video not found or unreadable');
  }
};
