import React from 'react';
import styles from './DateHeader.module.css';

interface DateHeaderProps {
  date: string; // "YYYY-MM-DD"
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
  const formatted = new Date(date + 'T12:00:00').toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.header}>
      <span>{formatted}</span>
    </div>
  );
};

export default DateHeader;
