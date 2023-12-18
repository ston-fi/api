export type FarmNftInfoResponse = {
  address: string;
  create_timestamp: string;
  min_unstake_timestamp: string;
  nonclaimed_rewards: string;
  staked_tokens: string;
  status: string;
};

export type FarmInfoResponse = {
  apy?: string | null;
  min_stake_duration_s: string;
  minter_address: string;
  nft_infos: FarmNftInfoResponse[];
  pool_address: string;
  reward_token_address: string;
  status: string;
};
