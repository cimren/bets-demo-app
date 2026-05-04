import React, { useEffect, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectSelectedOddIds } from '../store/couponSelectors';
import {
  loadBulletin,
  selectBulletinError,
  selectBulletinItems,
  selectBulletinStatus,
} from '../store/bulletinSlice';
import { Match } from '../types/bulletin';
import BulletinRow from './BulletinRow';
import DateHeader from './DateHeader';
import styles from './BulletinTable.module.css';

type VirtualEntry =
  | { type: 'header'; date: string }
  | { type: 'match'; match: Match };

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

  const rows = useMemo<VirtualEntry[]>(() => {
    const result: VirtualEntry[] = [];
    let lastDate = '';
    for (const match of items) {
      const date = match.startTime.slice(0, 10);
      if (date !== lastDate) {
        result.push({ type: 'header', date });
        lastDate = date;
      }
      result.push({ type: 'match', match });
    }
    return result;
  }, [items]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
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
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const entry = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className={styles.virtualRow}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {entry.type === 'header' ? (
                <DateHeader date={entry.date} />
              ) : (
                <BulletinRow
                  match={entry.match}
                  selectedOddIds={selectedOddIds}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BulletinTable;
