import { fileInfo } from './themes/FileInfo.css';

export const FileInfo = ({ text }: { text: string }) => (
  <p className={fileInfo}>{text}</p>
);
