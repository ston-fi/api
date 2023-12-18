export const AssetKind = {
  Ton: "Ton",
  Wton: "Wton",
  Jetton: "Jetton",
} as const;

export type AssetKind = keyof typeof AssetKind;

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
  symbol: string;
  third_party_price_usd?: string | null;
  wallet_address?: string | null;
};
