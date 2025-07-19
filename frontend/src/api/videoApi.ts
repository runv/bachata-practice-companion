export const uploadVideo = async (formData: FormData) => {
  const response = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
};

export const addCategory = async (category: string) => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category }),
  });
  if (!response.ok) throw new Error('Category upload failed');
  return response.json();
};

export const fetchVideos = async () => {
  const res = await fetch('http://localhost:3001/videos');
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch('http://localhost:3001/categories');
  return res.json();
};

export const fetchTags = async () => {
  const res = await fetch('http://localhost:3001/tags');
  if (!res.ok) return [];
  return res.json();
};
