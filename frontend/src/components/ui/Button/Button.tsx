import { button } from './themes/Button.css';
import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({ variant = 'primary', disabled, ...props }: Props) => {
  return (
    <button
      className={clsx(button[variant], disabled && button['disabled'])}
      disabled={disabled}
      {...props}
    />
  );
};
