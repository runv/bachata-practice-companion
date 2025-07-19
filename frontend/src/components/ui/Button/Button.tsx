import { button, buttonSize } from './themes/Button.css';
import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ variant = 'primary', size='md', disabled, ...props }: Props) => {
  return (
    <button
      className={clsx(button[variant], buttonSize[size], disabled && button['disabled'])}
      disabled={disabled}
      {...props}
    />
  );
};
