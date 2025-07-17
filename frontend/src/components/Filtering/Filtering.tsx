interface FilteringProps {
  selectedStyle: string;
  selectedLevel: string;
  onStyleChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  styles: string[];
  levels: string[];
}

export const Filtering = ({
  selectedStyle,
  selectedLevel,
  onStyleChange,
  onLevelChange,
  styles,
  levels
}: FilteringProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Style:
        <select value={selectedStyle} onChange={e => onStyleChange(e.target.value)}>
          <option value="">All</option>
          {styles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Level:
        <select value={selectedLevel} onChange={e => onLevelChange(e.target.value)}>
          <option value="">All</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

