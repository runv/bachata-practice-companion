import { useEffect, useState, useRef } from 'react';
import {  FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'

//const ffmpeg = new FFmpeg()({ log: true });

interface VideoCompressorProps {
  file: File;
  onCompressed: (compressedFile: File) => void;
  onError?: (error: string) => void;
  maxSizeBytes?: number; // Default: 100MB
}
const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'

export const VideoCompressor = ({
  file,
  onCompressed,
  onError,
  maxSizeBytes = 100 * 1024 * 1024,
}: VideoCompressorProps) => {
  const [loading, setLoading] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const ffmpeg = ffmpegRef.current;

  useEffect(() => {
    const compressVideo = async () => {
      setLoading(true);

      try {
        ffmpeg.on("log", ({ message }) => {
          console.log("ffmpeg:" + message);
        });

        ffmpeg.on('progress', ({ progress, time }) => {
            if (messageRef.current)
            messageRef.current.innerHTML = `${progress * 100} % (transcoded time: ${time / 1000000} s)`;
        });
        if (!ffmpeg.loaded) {
          await ffmpeg.load(
            {
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
           }
          );
        }

        const inputName = 'input.mp4';
        const outputName = 'output.mp4';
        await ffmpeg.writeFile( inputName, await fetchFile(file));

        // Step 1: Try standard CRF-based compression
        await ffmpeg.exec([
          '-i', inputName,
          '-c:v', 'libx264',
          '-crf', '28',
          '-c:a', 'aac',
          '-b:a', '128k',
          '-r', '30',
          outputName
         ]
        );

        let fileData = await ffmpeg.readFile(outputName);
        let data = new Uint8Array(fileData as ArrayBuffer);
        let blob = new Blob([data.buffer], { type: 'video/mp4' });

        // Step 2: Check size and fallback to bitrate-based compression
        if (blob.size > maxSizeBytes) {
          console.warn('First compression too large, trying bitrate-based fallback');

          // Get video duration (in seconds)
          const duration = await getVideoDuration(blob);

          // Calculate target bitrate in kbps
          const targetBitrate = Math.round((maxSizeBytes * 8) / duration / 1000); // kbps

          // Cleanup and overwrite input file
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

        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.mp4'), {
          type: 'video/mp4',
        });

        ffmpeg.deleteFile(outputName);
        ffmpeg.deleteFile(inputName);

        onCompressed(compressedFile);
      } catch (err) {
        console.error(err);
        if (onError) onError((err as Error).message || 'Compression failed');
      } finally {
        setLoading(false);
      }
    };

    compressVideo();
  }, [file, maxSizeBytes, onCompressed, onError, ffmpeg]);

  return <>
    <div ref={messageRef}></div>
    <div>{loading && <p>Compressing video, please wait…</p>}</div>
  </>;
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
