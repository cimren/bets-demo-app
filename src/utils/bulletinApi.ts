import { Match, OddItem } from '../types/bulletin';

const API_URL = 'https://nesine-case-study.onrender.com/bets';

interface RawOutcome {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}

interface RawOddsGroup {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, RawOutcome>;
}

interface BetApiItem {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, RawOddsGroup>;
  HEC: boolean;
}

function makeOdd(
  matchId: string,
  id: string,
  label: string,
  betValue: string | undefined,
  betType: string,
): OddItem | null {
  // if (!betValue) return null;
  const value = betValue ? parseFloat(betValue) : 0;
  // if (isNaN(value)) return null;
  return { id: `${matchId}-${id}`, matchId, label, value, betType };
}

function parseBetItem(item: BetApiItem): Match {
  const {
    C: matchId,
    N: matchName,
    D: matchDate,
    T: matchTime,
    OCG: oddsGroups,
    LN: league,
  } = item;

  const dashIdx = matchName.indexOf(' - ');
  const homeTeam = dashIdx !== -1 ? matchName.slice(0, dashIdx) : matchName;
  const awayTeam = dashIdx !== -1 ? matchName.slice(dashIdx + 3) : '';

  const [day, month, year] = matchDate.split('.');
  const startTime = `${year}-${month}-${day}T${matchTime}:00`;

  const mbs = parseInt(oddsGroups?.['1']?.MBS ?? '1', 10);

  const ocg1 = oddsGroups?.['1']?.OC;
  const ocg2 = oddsGroups?.['2']?.OC;
  const ocg5 = oddsGroups?.['5']?.OC;

  const odds: OddItem[] = [
    {
      id: `${matchId}-mbs`,
      matchId,
      label: 'MBS',
      value: mbs,
      betType: 'MBS',
    },
    makeOdd(matchId, '1', '1', ocg1?.['0']?.O, 'Maç Sonucu'),
    makeOdd(matchId, 'X', 'X', ocg1?.['1']?.O, 'Maç Sonucu'),
    makeOdd(matchId, '2', '2', ocg1?.['2']?.O, 'Maç Sonucu'),
    makeOdd(matchId, 'alt', 'Alt', ocg5?.['25']?.O, 'Alt/Üst'),
    makeOdd(matchId, 'ust', 'Üst', ocg5?.['26']?.O, 'Alt/Üst'),
    makeOdd(matchId, 'h1', 'H1', '', 'Handikap'),
    makeOdd(matchId, 'h1-1', '1', '', 'Maç Sonucu'),
    makeOdd(matchId, 'h1-X', 'X', '', 'Maç Sonucu'),
    makeOdd(matchId, 'h1-2', '2', '', 'Maç Sonucu'),
    makeOdd(matchId, 'h2', 'H2', '', 'Handikap'),
    makeOdd(matchId, '1-X', '1-X', ocg2?.['3']?.O, 'Çifte Şans'),
    makeOdd(matchId, '1-2', '1-2', ocg2?.['4']?.O, 'Çifte Şans'),
    makeOdd(matchId, 'X-2', 'X-2', ocg2?.['5']?.O, 'Çifte Şans'),
  ].filter((o): o is OddItem => o !== null);

  return { id: matchId, homeTeam, awayTeam, league, startTime, odds };
}

export async function fetchBulletin(): Promise<Match[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Bülten yüklenemedi: ${response.status}`);
  }
  const data: BetApiItem[] = await response.json();

  // Sort data based on the start time of matches
  return data
    .map(parseBetItem)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}
