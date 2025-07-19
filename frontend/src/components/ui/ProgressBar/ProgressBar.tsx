import { barWrapper, progressFill } from './themes/ProgressBar.css';

interface Props {
  progress: number;
}

export const ProgressBar = ({ progress }: Props) => (
  <div className={barWrapper}>
    <div className={progressFill} style={{ width: `${progress}%` }} />
  </div>
);