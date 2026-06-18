import React from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={clsx(styles.container, className)}>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.navButton}
      >
        <ChevronLeft size={16} />
      </Button>
      
      <div className={styles.pageInfo}>
        Page <span className={styles.current}>{currentPage}</span> of {totalPages}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.navButton}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
