import { Dialog } from '../ui/Dialog';
import { Filtering } from './Filtering';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedLevel: string;
  categories: string[];
  levels: string[];
  tags: string[];
  selectedTags: string[];
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onToggleTag: (tag: string) => void;
}

export const FilterModal = ({ open, onClose, ...filteringProps }: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    ariaLabel="Filter Videos"
    title="Filters"
  >
    <Filtering {...filteringProps} />
  </Dialog>
);