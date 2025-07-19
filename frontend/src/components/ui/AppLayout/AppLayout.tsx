import type { ReactNode } from 'react';
import { HeaderBar } from './HeaderBar';
import * as styles from './themes/AppLayout.css';

type Props = {
  title?: string;
  onUploadClick?: () => void;
  onFilterClick?: () => void;
  filters: ReactNode;
  thumbnails: ReactNode;
};

export function AppLayout({ title, onUploadClick, onFilterClick, filters, thumbnails }: Props) {
  return (
    <div className={styles.appRoot}>
      <div className={styles.container}>
        <HeaderBar
          title={title}
          onUploadClick={onUploadClick}
          onFilterClick={onFilterClick}
        />
        <main className={styles.mainContent}>
          <aside className={styles.filtersSidebar}>
            {filters}
          </aside>
          <section className={styles.thumbnailsSection}>
            {thumbnails}
          </section>
        </main>
      </div>
    </div>
  );
}