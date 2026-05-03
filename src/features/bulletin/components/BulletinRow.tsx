import React from 'react';
import { useDispatch } from 'react-redux';
import { Match } from '../types';
import OddCell from './OddCell';
import styles from './BulletinRow.module.css';
import { toggleSelection } from '../../../features/coupon/couponSlice';

interface BulletinRowProps {
  match: Match;
  selectedOddIds: Set<string>;
}

const BulletinRow: React.FC<BulletinRowProps> = ({ match, selectedOddIds }) => {
  const dispatch = useDispatch();

  const formattedTime = new Date(match.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.row}>
      <div className={styles.matchInfo}>
        <span className={styles.league}>{match.league}</span>
        <span className={styles.teams}>
          {match.homeTeam} — {match.awayTeam}
        </span>
        <span className={styles.time}>{formattedTime}</span>
      </div>

      <div className={styles.odds}>
        {match.odds.map((odd) => (
          <OddCell
            key={odd.id}
            odd={odd}
            isSelected={selectedOddIds.has(odd.id)}
            onClick={() => {
              dispatch(
                toggleSelection({
                  oddId: odd.id,
                  matchId: match.id,
                  matchLabel: `${match.homeTeam} — ${match.awayTeam}`,
                  oddLabel: odd.label,
                  oddValue: odd.value,
                  stake: 0,
                }),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(BulletinRow);
