import React from 'react';
import { useDispatch } from 'react-redux';
import { CouponSelection } from '../types/coupon';
import { removeSelection } from '../store/couponSlice';
import styles from './CouponItem.module.css';

interface CouponItemProps {
  selection: CouponSelection;
}

const CouponItem: React.FC<CouponItemProps> = ({ selection }) => {
  const dispatch = useDispatch();
  const { matchId, matchLabel, oddLabel, oddValue } = selection;

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.match}>
          <b>{matchId}</b> {matchLabel}
        </span>
        <span className={styles.odd}>
          {oddLabel} @ {oddValue.toFixed(2)}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.removeButton}
          onClick={() => dispatch(removeSelection(selection.oddId))}
          aria-label={`Remove ${selection.matchLabel}`}
        >
          ×
        </button>
      </div>
    </li>
  );
};

export default CouponItem;
