import React, { useState } from 'react';
import { useFileValidation } from '../../hooks/UseFileValidation';
import { VideoCompressor } from '../VideoCompressor';
import { uploadVideo } from '../../api/videoApi';


type Props = {
  defaultStyles: Array<string>;
  defaultLevels: Array<string>;
  onUpload: () => void;

};

export const UploadForm = ({ defaultLevels, defaultStyles, onUpload }: Props) => {
  const [video, setVideo] = useState<File | null>(null);
  const [styles, setStyles] = useState(defaultStyles);
  const [levels, setLevels] = useState(defaultLevels);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [name, setName] = useState('');
  const [newStyle, setNewStyle] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [tags, setTags] = useState('');
  const { isTooLarge, sizeInMB, MAX_SIZE_MB } = useFileValidation(video || undefined);


  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video || !selectedStyle || !selectedLevel) return;

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);
    formData.append('style', selectedStyle);
    formData.append('level', selectedLevel);

     // Normalize tags to lowercase, trim, remove empty
    const normalizedTags = tags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    formData.append('tags', JSON.stringify(normalizedTags));
    try {
      const result = await uploadVideo(formData);
      alert('Upload successful: ' + JSON.stringify(result.metadata));
      setVideo(null);
      setSelectedStyle('');
      setSelectedLevel('');
      setTags('');
      onUpload();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleAddStyle = () => {
    if (newStyle && !styles.includes(newStyle)) {
      setStyles([...styles, newStyle]);
      setSelectedStyle(newStyle);
      setNewStyle('');
    }
  };

  const handleAddLevel = () => {
    if (newLevel && !levels.includes(newLevel)) {
      setLevels([...levels, newLevel]);
      setSelectedLevel(newLevel);
      setNewLevel('');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div>
        <label>Upload Video</label>
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} />
      </div>

      {video && (
        <div>
          <p>File size: {sizeInMB.toFixed(2)} MB</p>
          {isTooLarge && <p style={{ color: 'red' }}>File is too large. Please compress it below {MAX_SIZE_MB} MB.</p>}
        </div>
      )}

      {
        video && isTooLarge && (
          <VideoCompressor
            file={video}
            onCompressed={(file) => setVideo(file)}
            onError={(msg) => console.log(msg)}
          />
        )
      }


      <div>
      <label>
        Video Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      </div>

      <div>
        <label>Select Style</label>
        <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
          <option value="">-- Select --</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Style"
          value={newStyle}
          onChange={(e) => setNewStyle(e.target.value)}
        />
        <button type="button" onClick={handleAddStyle}>
          + Add Style
        </button>
      </div>

      <div>
        <label>Select Level</label>
        <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="">-- Select --</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Level"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
        />
        <button type="button" onClick={handleAddLevel}>
          + Add Level
        </button>
      </div>
      <label>
        Tags (comma-separated):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. hip movement, arms, balance"
        />
      </label>

      <button type="submit" disabled={!video || !selectedStyle || !selectedLevel || !name || isTooLarge}>
        Upload
      </button>
    </form>
  );
};
