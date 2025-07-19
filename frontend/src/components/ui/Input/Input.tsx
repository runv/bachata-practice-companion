import { useState } from 'react';
import type { ChangeEvent } from 'react'
import * as styles from './themes/Input.css';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  height?: 'sm' | 'md' | 'lg';
}

 

export const Input = ({ label, height='md', ...props }: Props) => {
 const [fileName, setFilename] = useState<string | null>(null); 
 const {onChange, ...restProps} = props;
 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name); 
    }
    onChange?.(e);
 };

return props.type === 'file' ?
( <label className={clsx(styles.fileUploadWrapper, styles.inputSize[height])} >

  <span className={styles.fakeButton}>Choose File</span>
  <span className={styles.fileName}>{fileName || 'No file chosen'}</span>
  <input
    type="file"
    className={styles.hiddenInput}
    onChange={handleFileChange}
    {...restProps}
  />

</label>)
 :
 (<label className={styles.labelWrapper}>
    {label && <span className={styles.labelText}>{label}</span>}
    <input className={clsx(styles.input, styles.inputSize[height])} {...props} />
  </label>)
};