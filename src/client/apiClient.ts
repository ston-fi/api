import { ofetch } from "ofetch";

import { normalizeDate } from "../utils/normalizeDate";

import { normalizeRequest } from "./mappers/normalizeRequest";
import { normalizeResponse } from "./mappers/normalizeResponse";

import type { AssetInfoResponse, AssetInfoV2Response } from "./types/asset";
import type { FarmInfoResponse } from "./types/farm";
import type { PoolInfoResponse } from "./types/pool";
import type { SwapSimulationResponse, SwapStatusResponse } from "./types/swap";
import type { OperationInfoResponse, OperationType } from "./types/operation";
import type { RouterInfoResponse } from "./types/router";

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

  public async queryAssets({
    unconditionalAssets: unconditionalAsset,
    ...query
  }: {
    condition: string;
    walletAddress?: string;
    unconditionalAssets?: string[];
  }) {
    return normalizeResponse(
      await this.apiFetch<{ asset_list: AssetInfoV2Response[] }>(
        ...normalizeRequest("/v1/assets/query", {
          method: "POST",
          query: {
            ...query,
            unconditionalAsset,
          },
        }),
      ),
    ).assetList;
  }

  public async searchAssets(query: {
    searchString: string;
    condition: string;
    walletAddress?: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ asset_list: AssetInfoV2Response[] }>(
        ...normalizeRequest("/v1/assets/search", {
          method: "POST",
          query,
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

  public async getFarms(query?: {
    dexV2?: boolean;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/farms", {
          method: "GET",
          query,
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

  public async getSwapPairs(query?: { dexV2?: boolean }) {
    return normalizeResponse(
      await this.apiFetch<{ pairs: [string, string][] }>(
        ...normalizeRequest("/v1/markets", {
          method: "GET",
          query,
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

  public async getPool(data: string | { poolAddress: string }) {
    return normalizeResponse(
      await this.apiFetch<{ pool: PoolInfoResponse }>(
        ...normalizeRequest("/v1/pools/{poolAddress}", {
          method: "GET",
          query: typeof data === "string" ? { poolAddress: data } : data,
        }),
      ),
    ).pool;
  }

  public async getPools(query?: { dexV2?: boolean }) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/pools", {
          method: "GET",
          query,
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
    dexV2?: boolean;
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
    dexV2?: boolean;
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

  public async getWalletFarms(
    data: string | { walletAddress: string; dexV2?: boolean },
  ) {
    return normalizeResponse(
      await this.apiFetch<{ farm_list: FarmInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/farms", {
          method: "GET",
          query: typeof data === "string" ? { walletAddress: data } : data,
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

  public async getWalletPools(
    data: string | { walletAddress: string; dexV2?: boolean },
  ) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/pools", {
          method: "GET",
          query: typeof data === "string" ? { walletAddress: data } : data,
        }),
      ),
    ).poolList;
  }

  public async getWalletOperations({
    since,
    until,
    ...query
  }: {
    since: Date;
    until: Date;
    walletAddress: string;
    dexV2?: boolean;
    opType?: keyof typeof OperationType;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ operations: OperationInfoResponse[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/operations", {
          method: "GET",
          query: {
            ...query,
            since: normalizeDate(since),
            until: normalizeDate(until),
          },
        }),
      ),
    ).operations;
  }

  public async getOperations({ since, until }: { since: Date; until: Date }) {
    return normalizeResponse(
      await this.apiFetch<{ operations: OperationInfoResponse[] }>(
        ...normalizeRequest("/v1/stats/operations", {
          method: "GET",
          query: {
            since: normalizeDate(since),
            until: normalizeDate(until),
          },
        }),
      ),
    ).operations;
  }

  public async getRouters(query?: { dexV2?: boolean }) {
    return normalizeResponse(
      await this.apiFetch<{ router_list: RouterInfoResponse[] }>(
        ...normalizeRequest("/v1/routers", {
          method: "GET",
          query,
        }),
      ),
    ).routerList;
  }

  public async getRouter(routerAddress: string) {
    return normalizeResponse(
      await this.apiFetch<RouterInfoResponse>(
        ...normalizeRequest("/v1/routers/{routerAddress}", {
          method: "GET",
          query: {
            routerAddress,
          },
        }),
      ),
    ).router;
  }
}
