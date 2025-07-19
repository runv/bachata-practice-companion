import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metadataPath = path.join(__dirname, '../../storage/videos/metadata.json');

export interface VideoMetadata {
  id: string;
  originalname: string;
  filename: string;
  name?: string;
  mimetype: string;
  size: number;
  style: string;
  level: string;
  tags?: string[]; 
  thumbnail: string;
  uploadedAt: string;
}


const ensureMetadataFile = async () => {
  try {
    await fs.access(metadataPath);
  } catch {
    // Create an empty metadata file if it doesn't exist
    await fs.mkdir(path.dirname(metadataPath), { recursive: true });
    //const defaults = await fs.readFile(metadataPath, 'utf-8');
    await fs.writeFile(metadataPath, '[]', 'utf-8');
  }
};

export const getAllVideos = async (): Promise<VideoMetadata[]> => {
  await ensureMetadataFile();
  const data = await fs.readFile(metadataPath, 'utf-8');
  return JSON.parse(data);
};

export const saveVideoMetadata = async (newMetadata: VideoMetadata): Promise<void> => {
  let existing: VideoMetadata[] = [];

  try {
    existing = await getAllVideos();
  } catch (error) {
    // File doesn't exist or is empty — start fresh
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }

  existing.push(newMetadata);

  await fs.writeFile(metadataPath, JSON.stringify(existing, null, 2), 'utf-8');
};
