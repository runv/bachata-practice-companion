import type { ReactNode } from 'react';
import * as styles from './themes/AppLayout.css'; 

type Props = {
  title?: string;
  onUploadClick?: () => void;
  filters: ReactNode;
  thumbnails: ReactNode;
};

export function AppLayout({ title, onUploadClick, filters, thumbnails }: Props) {
  return (
   <div className={styles.appRoot}> 
    <div className={styles.container}>
      <header className={styles.headerBar}>
        <h1 className={styles.title}>{title || 'Video Library'}</h1>
        <button className={styles.uploadButton} onClick={onUploadClick}>Upload</button>
      </header>
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