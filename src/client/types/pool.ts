export const PoolTag = {
  LiquidityProvisionNotRecommended: "pool:liquidity_provision:not_recommended",
  LiquidityProvisionForbidden: "pool:liquidity_provision:forbidden",
  DexMajorVersion1: "pool:dex_major_version:1",
  DexMajorVersion2: "pool:dex_major_version:2",
  LiquidityNo: "pool:liquidity:no",
  LiquidityMedium: "pool:liquidity:medium",
  LiquidityLow: "pool:liquidity:low",
  LiquidityHigh: "pool:liquidity:high",
  LiquidityVeryHigh: "pool:liquidity:very_high",
  WalletHasLiquidity: "pool:wallet_has_liquidity",
} as const;

export type PoolTag = (typeof PoolTag)[keyof typeof PoolTag];

export type PoolInfoResponse = {
  address: string;
  apy_1d?: string | null;
  apy_7d?: string | null;
  apy_30d?: string | null;
  collected_token0_protocol_fee: string;
  collected_token1_protocol_fee: string;
  deprecated: boolean;
  lp_account_address?: string | null;
  lp_balance?: string | null;
  lp_fee: string;
  lp_price_usd?: string | null;
  lp_total_supply: string;
  lp_total_supply_usd?: string | null;
  lp_wallet_address?: string | null;
  popularity_index?: number;
  protocol_fee: string;
  protocol_fee_address: string;
  ref_fee: string;
  reserve0: string;
  reserve1: string;
  router_address: string;
  tags?: Array<PoolTag | (string & {})>;
  token0_address: string;
  token0_balance?: string | null;
  token1_address: string;
  token1_balance?: string | null;
  underlying_apr?: string;
  volume_24h_usd?: string | null;
  amp?: string;
  rate?: string;
  w0?: string;
};
