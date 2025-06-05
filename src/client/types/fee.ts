type AssetFeeStat = {
  asset_address: string;
  accrued: string;
  accrued_usd: string;
  withdrawn: string;
};

export type AssetsFeeStatsResponse = {
  assets_fee_stats: AssetFeeStat[];
  since: string;
  until: string;
  total_accrued_usd: string;
};

export type WithdrawalFeeStat = {
  amount: string;
  asset_address: string;
  exit_code: string;
  operation_wallet_address: string;
  router_address: string;
  success: boolean;
  vault_address: string;
  vault_tx_hash: string;
  vault_tx_lt: number;
  vault_tx_timestamp: string;
};

export type OperationFeeStat = {
  asset0_address: string;
  asset0_amount: string;
  asset0_delta: string;
  asset0_reserve: string;
  asset1_address: string;
  asset1_amount: string;
  asset1_delta: string;
  asset1_reserve: string;
  destination_wallet_address: string;
  exit_code: string;
  fee_asset_address: string;
  lp_fee_amount: string;
  lp_token_delta: string;
  lp_token_supply: string;
  operation_type: string;
  pool_address: string;
  pool_tx_hash: string;
  pool_tx_lt: number;
  pool_tx_timestamp: string;
  protocol_fee_amount: string;
  referral_address: string;
  referral_fee_amount: string;
  router_address: string;
  success: boolean;
  wallet_address: string;
  wallet_tx_hash: string;
  wallet_tx_lt: string;
  wallet_tx_timestamp: string;
};

export type VaultFeeInfo = {
  asset_address: string;
  balance: string;
  router_address: string;
  vault_address: string;
};
