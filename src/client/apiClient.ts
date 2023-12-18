import { ofetch } from "ofetch";

import { normalizeRequest } from "./mappers/normalizeRequest";
import { normalizeResponse } from "./mappers/normalizeResponse";
import type { AssetInfoResponse } from "./types/asset";
import type { FarmInfoResponse } from "./types/farm";
import type { PoolInfoResponse } from "./types/pool";

export type StonApiClientOptions = {
  baseUrl?: string;
};

export class StonApiClient {
  private readonly apiFetch;

  constructor(options?: StonApiClientOptions) {
    // Following code is needed to carry over the query params
    // from "options.baseUrl" to all requests because "ofetch" doesn't do it automatically
    // "ofetch('/baz', { baseURL: 'http://site.com?foo=bar' })" > "http://site.com?foo=bar/baz"

    const baseUrl = new URL(options?.baseUrl ?? "https://api.ston.fi");
    const baseQuery = [...new URLSearchParams(baseUrl.search)].reduce(
      // biome-ignore lint/performance/noAccumulatingSpread: it's ok here
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );

    this.apiFetch = ofetch.create({
      baseURL: `${baseUrl.origin}${baseUrl.pathname}`,
      query: baseQuery,
    });
  }

  public async getAssets() {
    return normalizeResponse(
      await this.apiFetch<{ asset_list: AssetInfoResponse[] }>(
        ...normalizeRequest("/v1/assets", {
          method: "GET",
        }),
      ),
    ).assetList;
  }

  public async getFarms() {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/farms", {
          method: "GET",
        }),
      ),
    ).farmList;
  }

  public async getPools() {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/pools", {
          method: "GET",
        }),
      ),
    ).poolList;
  }

  public async getJettonWalletAddress(query: {
    jettonAddress: string;
    ownerAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ address: string }>(
        ...normalizeRequest("/v1/jetton/{jettonAddress}/address", {
          method: "GET",
          query,
        }),
      ),
    ).address;
  }

  public async getWalletAssets(walletAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ asset_list: AssetInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/assets", {
          method: "GET",
          query: { walletAddress },
        }),
      ),
    ).assetList;
  }

  public async getWalletFarms(walletAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/farm", {
          method: "GET",
          query: { walletAddress },
        }),
      ),
    ).farmList;
  }

  public async getWalletPools(walletAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/pools", {
          method: "GET",
          query: { walletAddress },
        }),
      ),
    ).poolList;
  }
}
