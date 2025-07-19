import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.resolve(__dirname, '../../config/categories.json');
const STORAGE_PATH = path.resolve(__dirname, '../../storage/videos/categories.json');

export async function getCategories(): Promise<string[]> {
  try {
    const data = await fs.readFile(STORAGE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addCategory(newCategory: string): Promise<string[]> {
  const categories = await getCategories();
  const normalized = newCategory.trim();

  if (!normalized || categories.includes(normalized)) return categories;

  const updated = [...categories, normalized];
  await fs.writeFile(STORAGE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

export async function ensureCategoriesInitialized(): Promise<void> {
  try {
    await fs.access(STORAGE_PATH); 
  } catch {
    await fs.mkdir(path.dirname(STORAGE_PATH), { recursive: true });
    const defaults = await fs.readFile(CONFIG_PATH, 'utf-8');
    await fs.writeFile(STORAGE_PATH, defaults, 'utf-8');
  }
}
