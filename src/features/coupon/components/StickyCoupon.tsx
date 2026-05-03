import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCouponSelections,
  selectTotalOdd,
  selectPossibleWin,
} from '../selectors';
import { clearCoupon } from '../couponSlice';
import CouponItem from './CouponItem';
import styles from './StickyCoupon.module.css';

const StickyCoupon: React.FC = () => {
  const dispatch = useDispatch();
  const selections = useSelector(selectCouponSelections);
  const totalOdd = useSelector(selectTotalOdd);
  const possibleWin = useSelector(selectPossibleWin);

  if (selections.length === 0) return null;

  return (
    <aside className={styles.coupon} aria-label='Betting coupon'>
      <div className={styles.header}>
        <span className={styles.title}>Kupon ({selections.length})</span>
        <button
          className={styles.clearButton}
          onClick={() => dispatch(clearCoupon())}
        >
          Tümünü Temizle
        </button>
      </div>

      <ul className={styles.selectionList}>
        {selections.map((selection) => (
          <CouponItem key={selection.oddId} selection={selection} />
        ))}
      </ul>

      <div className={styles.footer}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Toplam Oran</span>
          <strong className={styles.statValue}>{totalOdd.toFixed(2)}</strong>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Maks. Kazanç</span>
          <strong className={styles.statValue}>{possibleWin.toFixed(2)}</strong>
        </div>
        <button className={styles.betButton}>Kupon Oluştur</button>
      </div>
    </aside>
  );
};

export default StickyCoupon;
