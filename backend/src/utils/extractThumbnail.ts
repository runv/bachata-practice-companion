import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

export const extractThumbnail = (videoPath: string, thumbnailPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => resolve())
      .on('error', err => reject(err))
      .screenshots({
        timestamps: ['00:00:01'],
        filename: path.basename(thumbnailPath),
        folder: path.dirname(thumbnailPath),
        size: '?x240'//'320x?'
      })
     // .aspect('4:3');
  });
};
