import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = clsx(
      error && errorId,
      helperText && !error && helperId
    ) || undefined;

    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, error && styles.inputError)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {error && <span id={errorId} className={styles.errorText} role="alert">{error}</span>}
        {helperText && !error && <span id={helperId} className={styles.helperText}>{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
