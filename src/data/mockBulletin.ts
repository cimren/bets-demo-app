import { Match, OddItem } from '../types/bulletin';

const LEAGUES = [
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Super Lig',
] as const;

const TEAMS_BY_LEAGUE: Record<string, string[]> = {
  'Premier League': [
    'Man City',
    'Arsenal',
    'Liverpool',
    'Chelsea',
    'Tottenham',
    'Man Utd',
    'Newcastle',
    'Aston Villa',
    'Brighton',
    'West Ham',
  ],
  'La Liga': [
    'Real Madrid',
    'Barcelona',
    'Atletico',
    'Sevilla',
    'Valencia',
    'Real Sociedad',
    'Villarreal',
    'Athletic Club',
    'Betis',
    'Osasuna',
  ],
  'Serie A': [
    'Juventus',
    'Inter',
    'AC Milan',
    'Roma',
    'Napoli',
    'Lazio',
    'Fiorentina',
    'Atalanta',
    'Torino',
    'Udinese',
  ],
  Bundesliga: [
    'Bayern',
    'Dortmund',
    'RB Leipzig',
    'Leverkusen',
    'Frankfurt',
    'Wolfsburg',
    'Freiburg',
    'Mainz',
    'Union Berlin',
    'Hoffenheim',
  ],
  'Ligue 1': [
    'PSG',
    'Marseille',
    'Monaco',
    'Lyon',
    'Lille',
    'Rennes',
    'Nice',
    'Lens',
    'Reims',
    'Strasbourg',
  ],
  'Super Lig': [
    'Galatasaray',
    'Fenerbahçe',
    'Beşiktaş',
    'Trabzonspor',
    'Başakşehir',
    'Sivasspor',
    'Konyaspor',
    'Samsunspor',
    'Göztepe',
    'Çaykur Rizespor',
  ],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateOdds(matchId: string, rand: () => number): OddItem[] {
  return [
    {
      id: `${matchId}-mbs`,
      matchId,
      label: 'MBS',
      value: 4,
      betType: 'MBS',
    },
    {
      id: `${matchId}-1`,
      matchId,
      label: '1',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-X`,
      matchId,
      label: 'X',
      value: +(rand() * 2 + 2.5).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-2`,
      matchId,
      label: '2',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-alt`,
      matchId,
      label: 'Alt',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Alt/Üst',
    },
    {
      id: `${matchId}-ust`,
      matchId,
      label: 'Üst',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Alt/Üst',
    },
    {
      id: `${matchId}-h1`,
      matchId,
      label: 'H1',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Handikap',
    },
    {
      id: `${matchId}-1-H2`,
      matchId,
      label: '1',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-X-H2`,
      matchId,
      label: 'X',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-2-H2`,
      matchId,
      label: '2',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: '1X2',
    },
    {
      id: `${matchId}-h2`,
      matchId,
      label: 'H2',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Handikap',
    },
    {
      id: `${matchId}-1-X`,
      matchId,
      label: '1-X',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Çifte Şans',
    },
    {
      id: `${matchId}-1-2`,
      matchId,
      label: '1-2',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Çifte Şans',
    },
    {
      id: `${matchId}-X-2`,
      matchId,
      label: 'X-2',
      value: +(rand() * 4 + 1.2).toFixed(2),
      betType: 'Çifte Şans',
    },
  ];
}

const BASE_TIME = new Date('2026-05-03T13:00:00Z').getTime();

export const mockBulletin: Match[] = Array.from({ length: 100 }, (_, i) => {
  const rand = seededRandom(i + 1);
  const league = LEAGUES[i % LEAGUES.length];
  const teams = TEAMS_BY_LEAGUE[league];
  const homeIdx = i % teams.length;
  const awayIdx =
    (i + 3) % teams.length === homeIdx
      ? (i + 4) % teams.length
      : (i + 3) % teams.length;
  const matchId = `match-${i + 1}`;

  return {
    id: matchId,
    homeTeam: teams[homeIdx],
    awayTeam: teams[awayIdx],
    league,
    startTime: new Date(
      BASE_TIME + Math.floor(i / 5) * 3_600_000,
    ).toISOString(),
    odds: generateOdds(matchId, rand),
  };
});
