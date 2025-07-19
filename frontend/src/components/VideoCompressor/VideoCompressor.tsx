import { useEffect, useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import * as style from './themes/VideoCompressor.css';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';

interface VideoCompressorProps {
  file: File;
  onCompressed: (compressedFile: File) => void;
  onError?: (error: string) => void;
  maxSizeBytes?: number;
}

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm';

export const VideoCompressor = ({
  file,
  onCompressed,
  onError,
  maxSizeBytes = 100 * 1024 * 1024,
}: VideoCompressorProps) => {
  const [loading, setLoading] = useState(false);
  const compressionInProgressRef = useRef(false);
  const [progress, setProgress] = useState(0); // percent
  const [bytesProcessed, setBytesProcessed] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [originalSize, ] = useState(file.size);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  //const messageRef = useRef<HTMLDivElement>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const ffmpeg = ffmpegRef.current;
  const videoUrl = useRef<string | null>(null);
  
  useEffect(() => {
    const compressVideo = async () => {
      setLoading(true);
      compressionInProgressRef.current = true;
      setError('');
      setDone(false);
      setCompressedFile(null);
      setCompressedSize(null);
      setProgress(0);
      setBytesProcessed(0);

      try {
        ffmpeg.on('progress', ({ progress }) => {
          setProgress(Math.round(progress * 100));
          setBytesProcessed(Math.round(progress * file.size));
        });

        if (!ffmpeg.loaded) {
          await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
          });
        }

        const inputName = 'input.mp4';
        const outputName = 'output.mp4';
        await ffmpeg.writeFile(inputName, await fetchFile(file));

        // Step 1: Try standard CRF-based compression
        await ffmpeg.exec([
          '-i', inputName,
          '-c:v', 'libx264',
          '-crf', '28',
          '-c:a', 'aac',
          '-b:a', '128k',
          '-r', '30',
          outputName
        ]);

        let fileData = await ffmpeg.readFile(outputName);
        let data = new Uint8Array(fileData as ArrayBuffer);
        let blob = new Blob([data.buffer], { type: 'video/mp4' });

        // Step 2: Check size and fallback to bitrate-based compression
        if (blob.size > maxSizeBytes) {
          const duration = await getVideoDuration(blob);
          const targetBitrate = Math.round((maxSizeBytes * 8) / duration / 1000); // kbps

          ffmpeg.deleteFile(outputName);

          await ffmpeg.exec([
            '-i', inputName,
            '-c:v', 'libx264',
            '-b:v', `${targetBitrate}k`,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-r', '30',
            outputName
          ]);

          fileData = await ffmpeg.readFile(outputName);
          data = new Uint8Array(fileData as ArrayBuffer);
          blob = new Blob([data.buffer], { type: 'video/mp4' });

          if (blob.size > maxSizeBytes) {
            throw new Error(`File still too large after bitrate compression: ${(blob.size / 1024 / 1024).toFixed(1)} MB`);
          }
        }

        const resultFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.mp4'), {
          type: 'video/mp4',
        });

        ffmpeg.deleteFile(outputName);
        ffmpeg.deleteFile(inputName);

        setCompressedFile(resultFile);
        setCompressedSize(resultFile.size);
        setDone(true);
        onCompressed(resultFile);
      } catch (err) {
        setError((err as Error).message || 'Compression failed');
        if (onError) onError((err as Error).message || 'Compression failed ');
      } finally {
        setLoading(false);
        compressionInProgressRef.current = false;
      }
    };
    console.log("use effect for compress file " + file + " compressionInProgress: " + compressionInProgressRef.current);

   // if (videoUrl.current) URL.revokeObjectURL(videoUrl.current);
    //  videoUrl.current = URL.createObjectURL(file);
    if ( compressionInProgressRef.current === true ) return;
    compressVideo();

    // Clean up video URL
    return () => {
      console.log("cleanup use effect for compress file  " );
     // if (videoUrl.current) URL.revokeObjectURL(videoUrl.current);
    };
  // omit ffmpeg from the dependency array because it is stable via useRef.
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [file, maxSizeBytes, onCompressed, onError]);

  // Generate preview URL for video placeholder
  useEffect(() => {
    console.log("use effect for file objtc url called file " + file);
    if (file) {
      console.log("setup file url obj " + videoUrl.current);
      //if (videoUrl.current) URL.revokeObjectURL(videoUrl.current);
      videoUrl.current = URL.createObjectURL(file);
    }
    return () => {
      console.log("cleanup file url obj" + videoUrl.current);
      if (videoUrl.current) URL.revokeObjectURL(videoUrl.current);
    };
  }, [file]);

  return (
    <div>
      {/* Video Placeholder */}
      <div className={style.videoPlaceholder}>
        <video
          src={videoUrl.current || undefined}
          className={done ? style.videoReady : style.videoTag}
          controls={done}
          autoPlay={false}
          playsInline
          tabIndex={-1}
          style={{ pointerEvents: done ? 'auto' : 'none' }}
        />
        {!done && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 'clamp(1.2rem, 2vw, 2rem)',
              fontWeight: 600,
              zIndex: 2,
            }}
          >
            Preview
          </div>
        )}
      </div>

      {/* Progress Info */}
      {loading && (
        <>
          <ProgressBar progress={progress} />
          <div className={style.progressInfo}>
            Compressing... {progress}% ({(bytesProcessed / 1024 / 1024).toFixed(1)} MB / {(originalSize / 1024 / 1024).toFixed(1)} MB)
          </div>
        </>
      )}

      {/* Success Message and Download */}
      {done && compressedFile && (
        <>
          <div className={style.successMessage}>Compression Done!</div>
          <div className={style.progressInfo}>
            Original: {(originalSize / 1024 / 1024).toFixed(1)} MB &nbsp;|&nbsp; Compressed: {(compressedSize! / 1024 / 1024).toFixed(1)} MB
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              const url = URL.createObjectURL(compressedFile);
              const a = document.createElement('a');
              a.href = url;
              a.download = compressedFile.name;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
            style={{ marginTop: '1rem' }}
          >
            Download Compressed Video
          </Button>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className={style.progressInfo} style={{ color: '#ef4444', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
    </div>
  );
};

async function getVideoDuration(blob: Blob): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(blob);
    video.onloadedmetadata = () => {
      resolve(video.duration || 60); // fallback to 60s
      URL.revokeObjectURL(video.src);
    };
    video.onerror = () => reject('Could not read video duration');
  });
}
