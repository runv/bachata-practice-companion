import { useEffect, useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { VideoList } from './components/VideoList';
import type { VideoMeta } from './components/VideoList';
import { Filtering } from './components/Filtering';

function App() {

 const [videos, setVideos] = useState<VideoMeta[]>([]);
 const [refreshToggle, setRefreshToggle] = useState(false); // Used to trigger refresh
 const [selectedStyle, setSelectedStyle] = useState('');
 const [selectedLevel, setSelectedLevel] = useState('');

  // Fetch videos
 useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('http://localhost:3001/videos');
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
 }, [refreshToggle]); // <- re-fetch when toggled

 // Passed to UploadForm so it can trigger refresh
 const triggerRefresh = () => setRefreshToggle((prev) => !prev);

 const filteredVideos = videos.filter(video => {
    const styleMatch = selectedStyle ? video.style === selectedStyle : true;
    const levelMatch = selectedLevel ? video.level === selectedLevel : true;
    return styleMatch && levelMatch;
 });

 return (
    <main>
      <h1>Bachata Practice Companion</h1>
      <UploadForm onUpload={triggerRefresh}/>
      <Filtering
        selectedStyle={selectedStyle}
        selectedLevel={selectedLevel}
        onStyleChange={setSelectedStyle}
        onLevelChange={setSelectedLevel}
        styles={['Lady Styling', 'Dominican', 'Footwork', 'Bachazouk']}
        levels={['Beginner', 'Intermediate', 'Advanced']}
      />
      <VideoList videos={filteredVideos}/>
    </main>
  );
}

export default App
