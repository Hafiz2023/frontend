import React from 'react';
import clsx from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import styles from './SuccessState.module.css';
import { Button } from './Button';
import { motion } from 'framer-motion';

export interface SuccessStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = "Success!",
  description = "The operation was completed successfully.",
  actionText,
  onAction,
  className,
  icon
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className={clsx(styles.container, className)}
    >
      <div className={styles.iconWrapper}>
        {icon || <CheckCircle2 size={56} className={styles.icon} />}
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
