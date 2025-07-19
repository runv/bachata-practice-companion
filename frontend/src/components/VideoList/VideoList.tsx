import { useState } from 'react';
import { Button } from '../ui/Button';
import * as styles from './themes/VideoList.css'; 

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
  onUploadClick?: () => void;
};

export const VideoList = ({ videos, onUploadClick }: Props) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (videos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📹</span>
        <div>No videos uploaded yet.</div>
        <Button variant="primary" size="md" onClick={onUploadClick}>
          Upload your first video
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.thumbnailGrid}>
      {videos.map((video) => (
        <div key={video.name} className={styles.thumbnailCard}>
          <div className={styles.thumbnail}>
            <img
              src={`http://localhost:3001/thumbnails/${video.thumbnail}`}
              alt={video.name}
              className={styles.thumbnailImage}
              onClick={
                  () => setSelectedVideo(video.filename)
              }
            />
            <div className={styles.thumbnailText}>
              <h3 className={styles.title}>{video.name}</h3>
              <p className={styles.categoryLevel}>
                <div>{video.style}</div> 
                <div>{video.level}</div>
              </p>
            </div>
          </div>
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
