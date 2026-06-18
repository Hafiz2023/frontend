import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

export interface LoaderProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 24, className, fullScreen = false, text }) => {
  return (
    <div className={clsx(styles.container, fullScreen && styles.fullScreen, className)}>
      <Loader2 className={styles.spinner} size={size} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};
