import React from 'react';
import clsx from 'clsx';
import styles from './Table.module.css';

export interface Column<T> {
  key: string | keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T>({ columns, data, keyExtractor, className, onRowClick }: TableProps<T>) {
  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className={styles.th}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className={clsx(styles.tr, onRowClick && styles.clickable)}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={styles.td}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] || '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
