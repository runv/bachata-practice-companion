import * as styles from './themes/TagsFilter.css';
import { TagButton } from '../ui/TagButton';
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
    <div className={styles.tagRow}>
      {tags.map((tag) => (
        <TagButton
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => {
            onToggle(tag);
          }}
        />
      ))}
    </div>
  );
};
