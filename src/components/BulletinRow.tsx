import React from 'react';
import { useDispatch } from 'react-redux';
import { Match } from '../types/bulletin';
import OddCell from './OddCell';
import styles from './BulletinRow.module.css';
import { toggleSelection } from '../store/couponSlice';

interface BulletinRowProps {
  match: Match;
  selectedOddIds: Set<string>;
}

const BulletinRow: React.FC<BulletinRowProps> = ({ match, selectedOddIds }) => {
  const dispatch = useDispatch();

  const startDate = new Date(match.startTime);
  const formattedDateTime = startDate.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.row}>
      <div className={styles.matchInfo}>
        <span className={styles.league}>{match.league}</span>
        <span className={styles.teams}>
          <b>{match.id}</b> {match.homeTeam} — {match.awayTeam}
        </span>
        <span className={styles.time}>{formattedDateTime}</span>
      </div>

      <div className={styles.odds}>
        {match.odds.map((odd) => (
          <OddCell
            key={odd.id}
            odd={odd}
            isSelected={selectedOddIds.has(odd.id)}
            onClick={() => {
              odd.value !== 0 &&
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
