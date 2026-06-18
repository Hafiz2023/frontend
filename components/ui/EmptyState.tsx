import React from 'react';
import clsx from 'clsx';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './EmptyState.module.css';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Found",
  description = "There is nothing to display here at the moment.",
  actionText,
  onAction,
  className,
  icon
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className={clsx(styles.container, className)}
    >
      <div className={styles.iconWrapper}>
        {icon || <Inbox size={48} className={styles.icon} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className={styles.actionButton}>
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};
