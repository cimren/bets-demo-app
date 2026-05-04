export interface CouponSelection {
  oddId: string;
  matchId: string;
  matchLabel: string;
  oddLabel: string;
  oddValue: number;
  stake: number;
}

export interface CouponState {
  selections: CouponSelection[];
  totalStake: number;
}
