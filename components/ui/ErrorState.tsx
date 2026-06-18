import React from 'react';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ErrorState.module.css';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  onRetry,
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className={clsx(styles.container, className)}
    >
      <div className={styles.iconWrapper}>
        <AlertTriangle size={36} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className={styles.retryButton}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};
