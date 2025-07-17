import { useEffect, useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { VideoList } from './components/VideoList';
import type { VideoMeta } from './components/VideoList';

function App() {

 const [videos, setVideos] = useState<VideoMeta[]>([]);
 const [refreshToggle, setRefreshToggle] = useState(false); // Used to trigger refresh

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

 return (
    <main>
      <h1>Bachata Practice Companion</h1>
      <UploadForm onUpload={triggerRefresh}/>
      <VideoList videos={videos}/>
    </main>
  );
}

export default App
