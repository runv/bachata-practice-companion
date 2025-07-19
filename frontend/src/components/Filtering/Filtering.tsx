import { TagsFilter } from '../TagsFilter';
import * as styles from './themes/FilterSection.css';
import { Select } from '../ui/Select'; 

interface FilteringProps {
  selectedCategory: string;
  selectedLevel: string;
  categories: string[];
  levels: string[];
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export const Filtering = ({
  selectedCategory,
  selectedLevel,
  categories,
  levels,
  onCategoryChange,
  onLevelChange,
  tags,
  selectedTags,
  onToggleTag,
}: FilteringProps) => {
  return (
    <section className={styles.filterSection}>
      <div className={styles.filterGroup}>
        <label htmlFor="category">Category</label>
        <Select
          label=""
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={['All', ...categories]}
        />
      </div>
      <div className={styles.filterGroup}>
        <label htmlFor="level">Level</label>
        <Select
          label=""
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          options={['All', ...levels]}
        />
      </div>
      <div className={styles.filterGroup}>
        <label>Tags</label>
        <TagsFilter 
          tags={tags} 
          selectedTags={selectedTags} 
          onToggle={onToggleTag} 
        />
      </div>
    </section>
  );
};
