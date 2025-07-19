import { useEffect, useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { VideoList } from './components/VideoList';
import type { VideoMeta } from './components/VideoList';
import { Filtering } from './components/Filtering';
import { 
  fetchVideos as remoteFetchVideos, 
  fetchTags  as remoteFetchTags, 
  fetchCategories as remoteFetchCategories,
  addCategory as remoteAddCategory,
  uploadVideo
} from './api/videoApi';


const defaultLevels = ['Beginner', 'Intermediate', 'Advanced'];

type Data = { 
  video: File; 
  name: string; 
  category: string; 
  level: string; 
  tags: string[] 
}


function App() {
 const [videos, setVideos] = useState<VideoMeta[]>([]);
 const [tags, setTags] = useState<string[]>([]);
 const [categories, setCategories] = useState<string[]>([]);
 const [refreshToggle, setRefreshToggle] = useState(false); // Used to trigger refresh
 const [selectedCategory, setSelectedCategory] = useState('');
 const [selectedLevel, setSelectedLevel] = useState('');
 const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch videos
 useEffect(() => {
    const fetchVideos = async () => {
      const response = await remoteFetchVideos();
      setVideos(response);
    };
    const fetchTags = async () => {
      const response = await remoteFetchTags();
      setTags(response);
    };
    const fetchCategories = async () => {
      const response = await remoteFetchCategories();
      setCategories(response);
    };
    fetchVideos();
    fetchTags();
    fetchCategories();
 }, [refreshToggle]); // <- re-fetch when toggled


const handleAddCategory = async (category: string) => {
  const addCategory = async () => {
    const response = await remoteAddCategory(category);
    setCategories(response);
  };
  addCategory();
  setRefreshToggle(!refreshToggle); // trigger refresh
};

const handleUploadSubmit = async (data: Data) => {
  const formData = new FormData();
  formData.append('video', data.video);
  formData.append('name', data.name);
  formData.append('style', data.category); // backend still uses 'style'
  formData.append('level', data.level);
  formData.append('tags', JSON.stringify(data.tags));

  await uploadVideo(formData);
  setRefreshToggle(!refreshToggle); // trigger refresh
};

 const toggleTag = (tag: string) => {
  setSelectedTags(prev =>
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
 };

 const filteredVideos = videos.filter(video => {
    const styleMatch = selectedCategory ? video.style === selectedCategory : true;
    const levelMatch = selectedLevel ? video.level === selectedLevel : true;
    const tagsMatch = selectedTags.every(tag => video.tags?.includes(tag));
    return styleMatch && levelMatch && tagsMatch;
 });

 return (
    <main>
      <h1>Bachata Practice Companion</h1>
      <UploadForm 
        categories={categories}
        defaultLevels={defaultLevels}
        onSubmit={handleUploadSubmit}
        onAddCategory={handleAddCategory}
      />
      <Filtering
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        onCategoryChange={setSelectedCategory}
        onLevelChange={setSelectedLevel}
        categories={categories}
        levels={defaultLevels}
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
      />
      <VideoList videos={filteredVideos}/>
    </main>
  );
}

export default App
