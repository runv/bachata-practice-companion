import { useState } from 'react';
import type {ChangeEvent, FormEvent } from 'react'
import { useFileValidation } from '../../hooks/UseFileValidation';
import { VideoCompressor } from '../VideoCompressor';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { ProgressBar } from '../ui/ProgressBar';
import { TagButton } from '../ui/TagButton';
import { SuccessMessage } from '../ui/SuccessMessage';
import { Select } from '../ui/Select';
import { FileInfo } from '../ui/FileInfo';
import * as style from './themes/UploadForm.css';


type Props = {
  categories: string[];
  defaultLevels: string[];
  onAddCategory: (category: string) => Promise<void>;
  onSubmit: (data: {
    video: File;
    name: string;
    category: string;
    level: string;
    tags: string[];
  }) => Promise<void>;
};

export const UploadForm = ({ categories, defaultLevels, onAddCategory, onSubmit }: Props) => {
  const [video, setVideo] = useState<File | null>(null);
  //const [levels, setLevels] = useState(defaultLevels);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [name, setName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  //const [newLevel, setNewLevel] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showCompressor, setShowCompressor] = useState(false);
  const { isTooLarge, sizeInMB, MAX_SIZE_MB } = useFileValidation(video || undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
      setShowCompressor(false);
      setSuccess(false);
    }
  };

  const handleAddTag = () => {
    const clean = newTag.trim().toLowerCase();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setNewTag('');
  };


  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!video || !name || !selectedCategory || !selectedLevel) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);
    formData.append('style', selectedCategory);
    formData.append('level', selectedLevel);
    formData.append('tags', JSON.stringify(tags));

    try {
      await onSubmit({ video, name, category:selectedCategory, level:selectedLevel, tags });
      setVideo(null);
      setName('');
      setSelectedCategory('');
      setSelectedLevel('');
      setTags([]);
      setNewTag('');
      setProgress(0);
      setSuccess(true);
    } catch (e) {
      setError('Upload failed ' + (e as Error).message);
      return;
    }
  };

  return (
    <form className={style.formWrapper} onSubmit={handleUpload}>
      <FormSection title="Video Info">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Select File" type="file" onChange={handleFileChange} />
         {video && <p className={style.fileInfo}>File size: {sizeInMB.toFixed(2)} MB</p>}
        <Select 
          label="Category" 
          value={selectedCategory} 
          options={categories}
          onChange={(e) => setSelectedCategory(e.target.value)}>
        </Select>
        <Select 
          label="Level" 
          value={selectedLevel} 
          options={defaultLevels}
          onChange={(e) => setSelectedLevel(e.target.value)}>
        </Select>
      </FormSection>
      <FormSection title="Add New Category">
        <div className={style.tagsRow}>
         <Input label="Add New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
         <Button type="button" onClick={() => {
            if (newCategory.trim()) {
              onAddCategory(newCategory.trim());
              setNewCategory('');
            }
          }}>Add Category</Button>
        </div>  
     </FormSection>

     <FormSection title="Tags">
        <div className={style.tagsRow}>
          <Input
            label="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          />
          <Button type="button" onClick={handleAddTag}>Add</Button>
        </div>
        <div className={style.tagsWrap}>
          {tags.map((tag) => (
            <TagButton
              key={tag}
              label={tag}
              selected
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            />
          ))}
        </div>
     </FormSection>


      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Upload completed successfully!" />}
      {progress > 0 && <ProgressBar progress={progress} />}

      <Button type="submit" disabled={!video || !name || !selectedCategory || !selectedLevel || !!error || isTooLarge}>
        Upload
      </Button>

      {video && isTooLarge && (
        <div className={style.compressorBlock}>
          <ErrorMessage message={`File is too large. Please compress it below ${MAX_SIZE_MB} MB.`} />
          <Button type="button" onClick={() => setShowCompressor(true)}>
            Compress Video
          </Button>
        </div>
      )}


      {video && isTooLarge && showCompressor && (
        <VideoCompressor
          file={video}
          maxSizeBytes={MAX_SIZE_MB}
          onCompressed={(file) => setVideo(file)}
          onError={(msg) => setError(msg)}
        />
      )}
    </form>
  );
};
