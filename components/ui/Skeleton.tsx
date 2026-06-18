import React from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  variant = 'rectangular',
}) => {
  return (
    <div
      className={clsx(styles.skeleton, styles[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
