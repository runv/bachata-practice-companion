import { Button } from '../Button';
import * as styles from './themes/AppLayout.css';


interface Props  {
  title?: string;//Bachata Practice Companion
}

export const HeaderBar = ({title}) => {
  return (
    <header className={styles.headerBar}>
      <h1 className={styles.title}>Bachata Practice Companion</h1>
      <Button onClick={() => {}}>Upload</Button>
    </header>
  );
};