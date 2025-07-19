import { promises as fs } from 'fs';
import path from 'path';

const tagsPath = path.join(process.cwd(), 'storage', 'videos', 'tags.json');

const ensureTagsFile = async () => {
  try {
    await fs.access(tagsPath);
  } catch {
    await fs.mkdir(path.dirname(tagsPath), { recursive: true });
    //const defaults = await fs.readFile(tagsPath, 'utf-8');
    await fs.writeFile(tagsPath, '[]', 'utf-8');
  }
};

export const getAllTags = async (): Promise<string[]> => {
  await ensureTagsFile(); 
  const data = await fs.readFile(tagsPath, 'utf-8');
  return JSON.parse(data); 
};

export const saveTags = async (tags: string[]): Promise<void> => {
  await fs.writeFile(tagsPath, JSON.stringify(tags, null, 2), 'utf-8');
};

export const addTags = async (newTags: string[]): Promise<string[]> => {
  const current = await getAllTags();
  const set = new Set(current.map(t => t.toLowerCase().trim()));

  newTags.forEach(tag => {
    const clean = tag.trim().toLowerCase(); 
    if (clean) set.add(clean); 
  });

  const updated = Array.from(set).sort(); 
  await saveTags(updated);
  return updated;
};
