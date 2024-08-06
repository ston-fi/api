export const AssetKind = {
  Ton: "Ton",
  Wton: "Wton",
  Jetton: "Jetton",
} as const;

export const AssetTag = [
  "default_symbol",
  "no_liquidity",
  "low_liquidity",
  "high_liquidity",
  "taxable",
  "deprecated",
] as const;

export type AssetKind = keyof typeof AssetKind;
export type AssetTag = typeof AssetTag;

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
