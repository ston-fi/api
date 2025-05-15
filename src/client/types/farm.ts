export type FarmNftInfoResponse = {
  address: string;
  create_timestamp: string;
  min_unstake_timestamp: string;
  nonclaimed_rewards: string;
  rewards: Array<{
    address: string;
    amount: string;
  }>;
  staked_tokens: string;
  status: string;
  unstake_timestamp?: string | null;
};

type FarmRewardInfo = {
  index: number;
  address?: string | null;
  status: string;
  admin_fee: string;
  remaining_rewards: string;
  reward_rate_24h: string;
  estimated_end_timestamp?: string | null;
  rewards_distributed: boolean;
};

type FarmMinterMeta = {
  image?: string | null;
  name?: string | null;
  description?: string | null;
  social_links?: string[] | null;
  marketplace?: string | null;
};

export type FarmInfoResponse = {
  apy?: string | null;
  min_stake_duration_s: string;
  minter_address: string;
  version: string;
  nft_infos: FarmNftInfoResponse[];
  pool_address: string;
  rewards: FarmRewardInfo[];
  status: string;
  locked_total_lp: string;
  locked_total_lp_usd?: string | null;
  all_rewards_distributed: boolean;

  meta?: FarmMinterMeta | null;

  owner_address?: string | null;
  custodian_address: string;
  create_timestamp?: string | null;
};
