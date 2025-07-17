import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metadataPath = path.join(__dirname, '../../storage/videos/metadata.json');

export const saveVideoMetadata = (metadata: object) => {
  let existing = [];
  if (fs.existsSync(metadataPath)) {
    const raw = fs.readFileSync(metadataPath, 'utf-8');
    existing = JSON.parse(raw);
  }
  existing.push(metadata);
  fs.writeFileSync(metadataPath, JSON.stringify(existing, null, 2));
};
