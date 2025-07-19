import { messageBox, success } from './themes/SuccessMessage.css';

type Props = {
  message: string;
};

export const SuccessMessage = ({ message }: Props) => {
  return <div className={`${messageBox} ${success}`}>{message}</div>;
};