import React, { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.selectContainer}>
          <select
            ref={ref}
            id={selectId}
            className={clsx(styles.select, error && styles.selectError)}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className={styles.icon} size={16} />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
