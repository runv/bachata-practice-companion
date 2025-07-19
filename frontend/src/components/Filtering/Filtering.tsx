import { TagsFilter } from '../TagsFilter';

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
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Category:
        <select value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map(style => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Level:
        <select value={selectedLevel} onChange={e => onLevelChange(e.target.value)}>
          <option value="">All</option>
          {levels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <TagsFilter tags={tags} selectedTags={selectedTags} onToggle={onToggleTag} />
    </div>
  );
};
