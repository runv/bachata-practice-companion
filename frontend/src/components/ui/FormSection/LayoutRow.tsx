import type { ReactNode } from 'react';
import * as styles from './themes/FormSection.css';

type Props = {
  children: ReactNode;
};

export const LayoutRow = ({ children }: Props) => {
  return <div className={styles.rowLayout}>{children}</div>;
};
