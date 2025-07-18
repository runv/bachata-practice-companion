interface TagsFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export const TagsFilter = ({
  tags,
  selectedTags,
  onToggle,
}: TagsFilterProps) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <strong>Tags:</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
        {tags.length > 0 && tags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};
