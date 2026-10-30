export const AssetKind = {
  Ton: "Ton",
  Wton: "Wton",
  Jetton: "Jetton",
  NotAnAsset: "NotAnAsset",
} as const;

export type AssetKind = keyof typeof AssetKind;

export const AssetTag = {
  Blacklisted: "asset:blacklisted",
  Suspicious: "asset:suspicious",
  Deprecated: "asset:deprecated",
  DefaultSymbol: "asset:default_symbol",
  LiquidityNo: "asset:liquidity:no",
  NoPools: "asset:no_pools",
  LiquidityMedium: "asset:liquidity:medium",
  LiquidityLow: "asset:liquidity:low",
  LiquidityHigh: "asset:liquidity:high",
  LiquidityVeryHigh: "asset:liquidity:very_high",
  Popular: "asset:popular",
  WalletHasBalance: "asset:wallet_has_balance",
  WalletHasLiquidityInPool: "asset:wallet_has_liquidity_in_pool",
  Taxable: "asset:taxable",
  Fake: "asset:fake",
  Honeypot: "asset:honeypot",
  DmcaComplaint: "asset:dmca_complaint",
  Essential: "asset:essential",
  Scaled: "asset:scaled",
  NonSearchable: "asset:non_searchable",

  /** @deprecated use LiquidityNo instead */
  NoLiquidity: "no_liquidity",
  /** @deprecated use LiquidityLow instead */
  LowLiquidity: "low_liquidity",
  /** @deprecated use LiquidityHigh instead */
  HighLiquidity: "high_liquidity",
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
  taxable: boolean;
  third_party_price_usd?: string | null;
  wallet_address?: string | null;
  popularity_index?: number;
  tags: Array<AssetTag | (string & {})>;
  custom_payload_api_uri?: string;
  scale?: string;
  extensions?: Array<"custom_payload" | "scaled-ui" | (string & {})>;
};

type AssetV2Meta = {
  decimals?: number;
  symbol?: string;
  display_name?: string;
  image_url?: string;
  custom_payload_api_uri?: string;
};

export type AssetInfoV2Response = {
  contract_address: string;
  kind: AssetKind;
  balance?: string;
  dex_price_usd?: string;
  meta?: AssetV2Meta;
  native_apr?: number;
  pair_priority?: number;
  popularity_index?: number;
  tags?: Array<AssetTag | (string & {})>;
  wallet_address?: string;
  scale?: string;
  extensions?: Array<"custom_payload" | "scaled-ui" | (string & {})>;
};
