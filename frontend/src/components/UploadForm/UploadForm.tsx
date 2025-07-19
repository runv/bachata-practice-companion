import { useState } from 'react';
import type {ChangeEvent, FormEvent } from 'react'
import { useFileValidation } from '../../hooks/UseFileValidation';
import { VideoCompressor } from '../VideoCompressor';
import { FormSection, LayoutRow } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { ProgressBar } from '../ui/ProgressBar';
import { TagButton } from '../ui/TagButton';
import { SuccessMessage } from '../ui/SuccessMessage';
import { Select } from '../ui/Select';
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
  const [showCategoryForm, setShowCategoryForm] = useState(false);

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

  const handleAddCategory = async () => {
    const clean = newCategory.trim().toLowerCase();
    try {
      await onAddCategory(clean);
      setNewCategory('');
      setShowCategoryForm(false); // Hide form again
    } catch (e) {
      setError('Upload failed ' + (e as Error).message);
      return;
    }
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
      </FormSection>
      <FormSection title="Category & Level">
        <div className={style.stackedSelectWrapper}>
         {/* Category */}
          <label htmlFor="category">Category</label>
          <Select 
              label="" // handled by external label
              value={selectedCategory} 
              options={categories}
              onChange={(e) => setSelectedCategory(e.target.value)}>
          </Select>
          {showCategoryForm ? (
          <div className={style.addCategoryRow}>
            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Add New Category" />
            <Button onClick={handleAddCategory}>Add</Button>
          </div>
         ) : (
          <Button
            variant="ghost"
            onClick={() => setShowCategoryForm(true)}
          >
            + Add new category
          </Button>
        )}
        {/* Level */}
        <label htmlFor="level">Level</label>
        <Select 
          label="" 
          value={selectedLevel} 
          options={defaultLevels}
          onChange={(e) => setSelectedLevel(e.target.value)}>
        </Select>
      </div>
       
      </FormSection>
     <FormSection title="Tags">
       <div className={style.tagWrapper}>
         <div className={style.tagChipArea}>
            {tags.map((tag) => (
              <TagButton
                key={tag}
                label={tag}
                selected
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              />
            ))}
          </div>
          <div className={style.tagsInputRow}>
            <Input
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" onClick={handleAddTag}>Add</Button>
          </div>
      </div>
     
     </FormSection>


      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Upload completed successfully!" />}
      {progress > 0 && <ProgressBar progress={progress} />}

      <Button type="submit" disabled={!video || !name || !selectedCategory || !selectedLevel || !!error || isTooLarge}>
        Upload
      </Button>

     
    </form>
  );
};
