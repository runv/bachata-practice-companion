import React, { useState } from 'react';

const defaultStyles = ['Lady Styling', 'Dominican', 'Footwork', 'Bachazouk'];
const defaultLevels = ['Beginner', 'Intermediate', 'Advanced'];

type Props = {
  onUpload: () => void;
};

export const UploadForm = ({ onUpload }: Props) => {
  const [video, setVideo] = useState<File | null>(null);
  const [styles, setStyles] = useState(defaultStyles);
  const [levels, setLevels] = useState(defaultLevels);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [name, setName] = useState('');
  const [newStyle, setNewStyle] = useState('');
  const [newLevel, setNewLevel] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video || !selectedStyle || !selectedLevel) return;

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);
    formData.append('style', selectedStyle);
    formData.append('level', selectedLevel);

    const res = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      alert('Upload successful: ' + JSON.stringify(result.metadata));
      setVideo(null);
      setSelectedStyle('');
      onUpload();
    } else {
      alert('Upload failed.');
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

      <button type="submit" disabled={!video || !selectedStyle || !selectedLevel || !name}>
        Upload
      </button>
    </form>
  );
};
