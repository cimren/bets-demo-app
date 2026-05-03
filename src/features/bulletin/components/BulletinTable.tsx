import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useSelector } from 'react-redux';
import { selectSelectedOddIds } from '../../../features/coupon/selectors';
import { mockBulletin } from '../data/mockBulletin';
import BulletinRow from './BulletinRow';
import styles from './BulletinTable.module.css';

const ROW_HEIGHT = 64;

const BulletinTable: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: mockBulletin.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  // Select the set of currently selected oddIds from Redux state so
  // each row can highlight its active cell.
  const selectedOddIds = useSelector(selectSelectedOddIds);

  return (
    <div ref={parentRef} className={styles.scrollContainer}>
      <div
        className={styles.totalHeight}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            className={styles.virtualRow}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            <BulletinRow
              match={mockBulletin[virtualRow.index]}
              selectedOddIds={selectedOddIds}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulletinTable;
