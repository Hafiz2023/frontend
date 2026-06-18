"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "disabled"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled = false, children, ...props }, ref) => {
    
    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={!(disabled || isLoading) ? { y: -2, scale: 1.02 } : {}}
        whileTap={!(disabled || isLoading) ? { scale: 0.98 } : {}}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          (disabled || isLoading) && styles.disabled,
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className={styles.spinner} size={18} />}
        <span className={clsx(isLoading && styles.hiddenText)}>{children as React.ReactNode}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
