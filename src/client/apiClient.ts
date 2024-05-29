import { ofetch } from "ofetch";

import { normalizeRequest } from "./mappers/normalizeRequest";
import { normalizeResponse } from "./mappers/normalizeResponse";
import type { AssetInfoResponse } from "./types/asset";
import type { FarmInfoResponse } from "./types/farm";
import type { PoolInfoResponse } from "./types/pool";
import type { SwapSimulationResponse, SwapStatusResponse } from "./types/swap";

export type StonApiClientOptions = {
  baseURL?: string;
  /** @deprecated use `baseURL` instead to better match `FetchOptions` */
  baseUrl?: string;
};

export class StonApiClient {
  private readonly apiFetch;

  constructor(options?: StonApiClientOptions) {
    // Following code is needed to carry over the query params
    // from "options.baseUrl" to all requests because "ofetch" doesn't do it automatically
    // "ofetch('/baz', { baseURL: 'http://site.com?foo=bar' })" > "http://site.com?foo=bar/baz"

    const baseUrl = new URL(
      options?.baseURL ?? options?.baseUrl ?? "https://api.ston.fi",
    );
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

  public async getAsset(assetAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ asset: AssetInfoResponse }>(
        ...normalizeRequest("/v1/assets/{assetAddress}", {
          method: "GET",
          query: { assetAddress },
        }),
      ),
    ).asset;
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

  public async getFarm(farmAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ farm: FarmInfoResponse }>(
        ...normalizeRequest("/v1/farms/{farmAddress}", {
          method: "GET",
          query: { farmAddress },
        }),
      ),
    ).farm;
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

  public async getFarmsByPool(poolAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/farms_by_pool/{poolAddress}", {
          method: "GET",
          query: { poolAddress },
        }),
      ),
    ).farmList;
  }

  public async getSwapPairs() {
    return normalizeResponse(
      await this.apiFetch<{ pairs: [string, string][] }>(
        ...normalizeRequest("/v1/markets", {
          method: "GET",
        }),
      ),
    ).pairs;
  }

  public async getSwapStatus(query: {
    routerAddress: string;
    ownerAddress: string;
    queryId: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<SwapStatusResponse>(
        ...normalizeRequest("/v1/swap/status", {
          method: "GET",
          query,
        }),
      ),
    );
  }

  public async getPool(poolAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ pool: PoolInfoResponse }>(
        ...normalizeRequest("/v1/pools/{poolAddress}", {
          method: "GET",
          query: { poolAddress },
        }),
      ),
    ).pool;
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

  public async simulateSwap(query: {
    askAddress: string;
    offerAddress: string;
    offerUnits: string;
    slippageTolerance: string;
    referralAddress?: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<SwapSimulationResponse>(
        ...normalizeRequest("/v1/swap/simulate", {
          method: "POST",
          query: {
            ...query,
            units: query.offerUnits,
          },
        }),
      ),
    );
  }

  public async simulateReverseSwap(query: {
    askAddress: string;
    askUnits: string;
    offerAddress: string;
    slippageTolerance: string;
    referralAddress?: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<SwapSimulationResponse>(
        ...normalizeRequest("/v1/reverse_swap/simulate", {
          method: "POST",
          query: {
            ...query,
            units: query.askUnits,
          },
        }),
      ),
    );
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

  public async getWalletAsset(query: {
    walletAddress: string;
    assetAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ asset: AssetInfoResponse }>(
        ...normalizeRequest(
          "/v1/wallets/{walletAddress}/assets/{assetAddress}",
          {
            method: "GET",
            query,
          },
        ),
      ),
    ).asset;
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

  public async getWalletFarm(query: {
    walletAddress: string;
    farmAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ farm: FarmInfoResponse }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/farms/{farmAddress}", {
          method: "GET",
          query,
        }),
      ),
    ).farm;
  }

  public async getWalletFarms(walletAddress: string) {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/farms", {
          method: "GET",
          query: { walletAddress },
        }),
      ),
    ).farmList;
  }

  public async getWalletPool(query: {
    walletAddress: string;
    poolAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ pool: PoolInfoResponse }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/pools/{poolAddress}", {
          method: "GET",
          query,
        }),
      ),
    ).pool;
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
