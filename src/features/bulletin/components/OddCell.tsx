import React from 'react';
import { OddItem } from '../types';
import styles from './OddCell.module.css';

interface OddCellProps {
  odd: OddItem;
  isSelected: boolean;
  onClick: () => void;
}

const OddCell: React.FC<OddCellProps> = ({ odd, isSelected, onClick }) => {
  return (
    <button
      className={`${styles.cell} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${odd.label}: ${odd.value}`}
    >
      <span className={styles.label}>{odd.label}</span>
      <span className={styles.value}>{odd.value.toFixed(2)}</span>
    </button>
  );
};

export default React.memo(OddCell);
