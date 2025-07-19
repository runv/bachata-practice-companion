import { errorBox } from './themes/ErrorMessage.css';

interface Props {
  message: string;
}

export const ErrorMessage = ({ message }: Props) => (
  <div className={errorBox}>{message}</div>
);