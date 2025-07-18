export const uploadVideo = async (formData: FormData) => {
  const response = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
};

export const fetchVideos = async () => {
  const res = await fetch('http://localhost:3001/videos');
  return res.json();
};

export const fetchTags = async () => {
  const res = await fetch('http://localhost:3001/tags');
  if (!res.ok) return [];
  return res.json();
};
