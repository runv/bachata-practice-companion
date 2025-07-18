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
      {videos.map((video) => (
        <div key={video.name} style={{ display: 'inline-block', margin: '1rem' }}>
          <img
            src={`http://localhost:3001/thumbnails/${video.thumbnail}`}
            alt={video.name}
            style={{ width: '200px', cursor: 'pointer', borderRadius: '8px' }}
            onClick={
                () => setSelectedVideo(video.filename)
            }
          />
          <h3>{video.name}</h3>
          <p>{video.style} • {video.level}</p>
        </div>
      ))}
      {selectedVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={
            () => setSelectedVideo(null)
          }
        >
          <video
            controls
            autoPlay
            style={{ maxWidth: '80%', maxHeight: '80%' }}
            onClick={e => e.stopPropagation()}
          >
            <source src={`http://localhost:3001/videos/${selectedVideo}`} />
          </video>
        </div>
      )}
    </div>
  );
};
