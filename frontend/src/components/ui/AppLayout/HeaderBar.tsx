import { Button } from '../Button';
import * as styles from './themes/AppLayout.css';

interface Props  {
  title?: string;
  onUploadClick?: () => void;
  onFilterClick?: () => void;
}

export const HeaderBar = ({title, onUploadClick, onFilterClick}: Props) => (
  <header className={styles.headerBar}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.headerActions}>
      <Button
        variant="primary"
        size="lg"
        className={styles.uploadButton}
        onClick={onUploadClick}
        aria-label="Upload Video"
      >
        Upload
      </Button>
      <Button
        variant="primary"
        size="lg"
        className={styles.filterButton}
        onClick={onFilterClick}
        aria-label="Filter Videos"
      >
        Filter
      </Button>
    </div>
  </header>
);