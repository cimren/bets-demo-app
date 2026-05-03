import React, { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { selectSelectedOddIds } from '../../../features/coupon/selectors';
import {
  loadBulletin,
  selectBulletinError,
  selectBulletinItems,
  selectBulletinStatus,
} from '../bulletinSlice';
import BulletinRow from './BulletinRow';
import styles from './BulletinTable.module.css';

const ROW_HEIGHT = 64;

const BulletinTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const parentRef = useRef<HTMLDivElement>(null);

  const items = useSelector(selectBulletinItems);
  const status = useSelector(selectBulletinStatus);
  const error = useSelector(selectBulletinError);
  const selectedOddIds = useSelector(selectSelectedOddIds);

  useEffect(() => {
    dispatch(loadBulletin());
  }, [dispatch]);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
    measureElement:
      typeof window !== 'undefined'
        ? (el) => el.getBoundingClientRect().height
        : undefined,
  });

  if (status === 'loading') {
    return <div className={styles.message}>Yükleniyor…</div>;
  }

  if (status === 'failed') {
    return <div className={styles.message}>{error}</div>;
  }

  return (
    <div ref={parentRef} className={styles.scrollContainer}>
      <div
        className={styles.totalHeight}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            className={styles.virtualRow}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            <BulletinRow
              match={items[virtualRow.index]}
              selectedOddIds={selectedOddIds}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulletinTable;
