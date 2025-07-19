import { input, labelWrapper, labelText } from './themes/Input.css';
import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...props }: Props) => (
  <label className={labelWrapper}>
    {label && <span className={labelText}>{label}</span>}
    <input className={input} {...props} />
  </label>
);