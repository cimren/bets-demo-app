export interface OddItem {
  id: string;
  matchId: string;
  label: string;
  value: number;
  betType: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  odds: OddItem[];
}

export type BulletinData = Match[];
