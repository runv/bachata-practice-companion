import { useState } from 'react';

export type VideoMeta = {
  originalname: string;
  name: string;
  filename: string;
  style: string;
  level: string;
  tags?: string[]; 
};

type Props = {
  videos: VideoMeta[];
};

export const VideoList = ({ videos }: Props) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  //if (loading) return <div>Loading videos...</div>;

  return (
    <div>
      {videos.length === 0 && <p>No videos uploaded yet.</p>}
      {videos.map((video, idx) => (
        <div key={idx}>
          <p><strong>Name:</strong> {video.name ?? video.originalname}</p>
          <button onClick={() => setSelectedVideo(video.filename)}>
             ▶️ Play
          </button>
          {selectedVideo === video.filename && (
            <video
                width="300"
                controls
                preload="metadata"
                src={`http://localhost:3001/videos/${selectedVideo}`}
            />
           )}
          <p>
            <strong>Style:</strong> {video.style} | <strong>Level:</strong>{' '}
            {video.level}
          </p>
        </div>
      ))}
    </div>
  );
};
