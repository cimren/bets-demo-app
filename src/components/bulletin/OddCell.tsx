import React from 'react';
import { OddItem } from '../../types/bulletin';
import styles from './OddCell.module.css';

interface OddCellProps {
  odd: OddItem;
  isSelected: boolean;
  onClick?: () => void;
}

const OddCell: React.FC<OddCellProps> = ({ odd, isSelected, onClick }) => {
  const { betType, label, value } = odd;
  if (betType === 'MBS') {
    return (
      <div className={styles.infoCell}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }

  return (
    <button
      className={`${styles.cell} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${label}: ${value}`}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {value === 0 ? '-' : value?.toFixed(2)}
      </span>
    </button>
  );
};

export default React.memo(OddCell);
