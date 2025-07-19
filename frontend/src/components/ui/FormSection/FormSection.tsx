import { formSection } from './themes/FormSection.css';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
}

export const FormSection = ({ children, title }: Props) => (
  <fieldset className={formSection}>
    {title && <legend>{title}</legend>}
    {children}
  </fieldset>
);