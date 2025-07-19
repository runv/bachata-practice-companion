import { tagButton, selectedTag } from './themes/TagButton.css';

interface Props {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export const TagButton = ({ label, selected = false, onClick }: Props) => (
  <button
    className={`${tagButton} ${selected ? selectedTag : ''}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);