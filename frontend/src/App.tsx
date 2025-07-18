import { useEffect, useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { VideoList } from './components/VideoList';
import type { VideoMeta } from './components/VideoList';
import { Filtering } from './components/Filtering';
import { fetchVideos as remoteFetchVideos, fetchTags  as remoteFetchTags} from './api/videoApi';

const defaultStyles = ['Bachata Sensual', 'Lady Styling', 'Dominican', 'Footwork', 'Bachazouk'];
const defaultLevels = ['Beginner', 'Intermediate', 'Advanced'];

function App() {
 const [videos, setVideos] = useState<VideoMeta[]>([]);
 const [tags, setTags] = useState<string[]>([]);
 const [refreshToggle, setRefreshToggle] = useState(false); // Used to trigger refresh
 const [selectedStyle, setSelectedStyle] = useState('');
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
    fetchVideos();
    fetchTags();
 }, [refreshToggle]); // <- re-fetch when toggled

 // Passed to UploadForm so it can trigger refresh
 const triggerRefresh = () => setRefreshToggle((prev) => !prev);

 const toggleTag = (tag: string) => {
  setSelectedTags(prev =>
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
 };

 const filteredVideos = videos.filter(video => {
    const styleMatch = selectedStyle ? video.style === selectedStyle : true;
    const levelMatch = selectedLevel ? video.level === selectedLevel : true;
    const tagsMatch = selectedTags.every(tag => video.tags?.includes(tag));
    return styleMatch && levelMatch && tagsMatch;
 });

 return (
    <main>
      <h1>Bachata Practice Companion</h1>
      <UploadForm 
        defaultStyles={defaultStyles}
        defaultLevels={defaultLevels}
        onUpload={triggerRefresh}
      />
      <Filtering
        selectedStyle={selectedStyle}
        selectedLevel={selectedLevel}
        onStyleChange={setSelectedStyle}
        onLevelChange={setSelectedLevel}
        styles={defaultStyles}
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
