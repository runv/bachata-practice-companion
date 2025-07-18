import { TagsFilter } from '../TagsFilter';

interface FilteringProps {
  selectedStyle: string;
  selectedLevel: string;
  styles: string[];
  levels: string[];
  onStyleChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export const Filtering = ({
  selectedStyle,
  selectedLevel,
  styles,
  levels,
  onStyleChange,
  onLevelChange,
  tags,
  selectedTags,
  onToggleTag,
}: FilteringProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Style:
        <select value={selectedStyle} onChange={e => onStyleChange(e.target.value)}>
          <option value="">All</option>
          {styles.map(style => (
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
