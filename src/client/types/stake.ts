export type WalletStakesResponse = {
  minted_gemston: string;
  nfts?: StakeNft[];
  staked_ston: string;
  ston_balance: string;
  voting_power: string;
};

export const StakeNftStatus = {
  Uninitialized: "uninitialized",
  Active: "active",
  Unstaked: "unstaked",
  Claiming: "claiming",
} as const;

export type StakeNftStatus =
  (typeof StakeNftStatus)[keyof typeof StakeNftStatus];

export type StakeNft = {
  address: string;
  image_url: string;
  min_unstaking_timestamp: string;
  minted_gemston: string;
  staked_tokens: string;
  staking_timestamp: string;
  status: `${StakeNftStatus}`;
  unstake_timestamp?: string | null;
  voting_power: string;
};

export type StakingStatsResponse = {
  gemston_total_supply: string;
  ston_price_usd: string;
  ston_total_supply: string;
  total_staked_ston: string;
};
