export const AssetKind = {
  Ton: "Ton",
  Wton: "Wton",
  Jetton: "Jetton",
} as const;

export type AssetKind = keyof typeof AssetKind;

export const AssetTag = {
  Taxable: "taxable",
  Deprecated: "deprecated",
  Blacklisted: "blacklisted",
  DefaultSymbol: "default_symbol",
  NoLiquidity: "no_liquidity",
  LowLiquidity: "low_liquidity",
  HighLiquidity: "high_liquidity",
  WalletHasBalance: "wallet_has_balance",
  WalletHasLiquidityInPool: "wallet_has_liquidity_in_pool",
} as const;

export type AssetTag = (typeof AssetTag)[keyof typeof AssetTag];

export type AssetInfoResponse = {
  balance?: string | null;
  blacklisted: boolean;
  community: boolean;
  contract_address: string;
  decimals: number;
  default_symbol: boolean;
  deprecated: boolean;
  dex_price_usd?: string | null;
  display_name?: string | null;
  image_url?: string | null;
  kind: AssetKind;
  priority: number;
  symbol: string;
  third_party_price_usd?: string | null;
  wallet_address?: string | null;
  tags: AssetTag[];
};

type AssetV2Meta = {
  decimals?: number;
  symbol?: string;
  display_name?: string;
  image_url?: string;
};

export type AssetInfoV2Response = {
  contract_address: string;
  kind: AssetKind;
  balance?: string;
  dex_price_usd?: string;
  meta?: AssetV2Meta;
  pair_priority?: number;
  tags?: AssetTag[];
  wallet_address?: string;
};
