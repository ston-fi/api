import { ofetch } from "ofetch";

import { normalizeDate } from "../utils/normalizeDate";

import { normalizeRequest } from "./mappers/normalizeRequest";
import { normalizeResponse } from "./mappers/normalizeResponse";

import type { AssetInfoResponse, AssetInfoV2Response } from "./types/asset";
import type { FarmInfoResponse } from "./types/farm";
import type {
  AssetsFeeStatsResponse,
  OperationFeeStat,
  VaultFeeInfo,
  WithdrawalFeeStat,
} from "./types/fee";
import type {
  LiquidityProvisionSimulationQuery,
  LiquidityProvisionSimulationResponse,
} from "./types/liquidityProvision";
import type { OperationInfoResponse, OperationType } from "./types/operation";
import type { PoolInfoResponse } from "./types/pool";
import type { RouterInfoResponse } from "./types/router";
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
      baseURL: `${baseUrl.origin ?? baseUrl.href}${baseUrl.pathname}`,
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

  public async searchAssets({
    unconditionalAssets: unconditionalAsset,
    ...query
  }: {
    searchString: string;
    condition: string;
    walletAddress?: string;
    unconditionalAssets?: string[];
    limit?: number;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ asset_list: AssetInfoV2Response[] }>(
        ...normalizeRequest("/v1/assets/search", {
          method: "POST",
          query: {
            ...query,
            unconditionalAsset,
          },
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
    /**
     * If true farms for V2 pools will be present in the response.
     *
     * @default true
     */
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

  public async getSwapPairs(query?: {
    /**
     * If true V2 pool pairs will be present in the response.
     *
     * @default true
     */
    dexV2?: boolean;
  }) {
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

  public async getPools(query?: {
    /**
     * If true V2 pools will be present in the response.
     *
     * @default true
     */
    dexV2?: boolean;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/pools", {
          method: "GET",
          query,
        }),
      ),
    ).poolList;
  }

  public async getPoolsByAssetPair(query: {
    asset0Address: string;
    asset1Address: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest(
          "/v1/pools/by_market/{asset0Address}/{asset1Address}",
          {
            method: "GET",
            query,
          },
        ),
      ),
    ).poolList;
  }

  public async queryPools({
    unconditionalAssets: unconditionalAsset,
    ...query
  }: {
    condition: string;
    walletAddress?: string;
    unconditionalAssets?: string[];
    /**
     * If true V2 pools will be present in the response.
     *
     * @default true
     */
    dexV2?: boolean;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ pool_list: PoolInfoResponse[] }>(
        ...normalizeRequest("/v1/pool/query", {
          method: "POST",
          query: {
            ...query,
            unconditionalAsset,
          },
        }),
      ),
    ).poolList;
  }

  public async simulateSwap({
    offerUnits: units,
    ...query
  }: {
    /** The address of the token we want to sell */
    offerAddress: string;
    /** Number of token units we want to sell */
    offerUnits: string;
    /** The address of the token we want to buy */
    askAddress: string;
    /**
     * The maximum possible difference between the rates that we expect and which will actually be,
     * in fractions (for example, 0.001 is 0.1%)
     *
     * Recommended value is 0.01 (1%)
     */
    slippageTolerance: string;
    /**
     * Referral address
     *
     * @default undefined
     */
    referralAddress?: string;
    /**
     * Referral fee in base points
     *
     * Applies only for dex v2, for v1 is always 10 (0.1%)
     * Applies only if `referralAddress` is set
     * Should be in range [0, 100] BPS
     *
     * @default undefined
     */
    referralFeeBps?: string;
    /**
     * If true V2 pools might be selected for the swap.
     *
     * @default true
     */
    dexV2?: boolean;
    /**
     * Allows to restrict exact DEX version (or multiple) to be used for the swap.
     *
     * @default undefined
     */
    dexVersion?: Array<"1" | 1 | "2" | 2>;
    /**
     * Pool address
     *
     * @default undefined
     */
    poolAddress?: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<SwapSimulationResponse>(
        ...normalizeRequest("/v1/swap/simulate", {
          method: "POST",
          query: {
            ...query,
            units,
          },
        }),
      ),
    );
  }

  public async simulateReverseSwap({
    askUnits: units,
    ...query
  }: {
    /** The address of the token we want to sell */
    offerAddress: string;
    /** The address of the token we want to buy */
    askAddress: string;
    /** Number of token units we want to buy */
    askUnits: string;
    /**
     * The maximum possible difference between the rates that we expect and which will actually be,
     * in fractions (for example, 0.001 is 0.1%)
     *
     * Recommended value is 0.01 (1%)
     */
    slippageTolerance: string;
    /**
     * Referral address
     *
     * @default undefined
     */
    referralAddress?: string;
    /**
     * Referral fee in base points. Should be in range [0, 100] BPS
     *
     * Applies only if `referralAddress` is set
     * Applies only for dex v2, for v1 is always 10 BPS (0.1%)
     *
     * @default undefined
     */
    referralFeeBps?: string;
    /**
     * If true V2 pools might be selected for the swap.
     *
     * @default true
     */
    dexV2?: boolean;
    /**
     * Allows to restrict exact DEX version (or multiple) to be used for the swap.
     *
     * @default undefined
     */
    dexVersion?: Array<"1" | 1 | "2" | 2>;
    /**
     * Pool address
     *
     * @default undefined
     */
    poolAddress?: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<SwapSimulationResponse>(
        ...normalizeRequest("/v1/reverse_swap/simulate", {
          method: "POST",
          query: {
            ...query,
            units,
          },
        }),
      ),
    );
  }

  public async simulateLiquidityProvision(
    query: LiquidityProvisionSimulationQuery,
  ) {
    return normalizeResponse(
      await this.apiFetch<LiquidityProvisionSimulationResponse>(
        ...normalizeRequest("/v1/liquidity_provision/simulate", {
          method: "POST",
          query,
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
    /**
     * Wallet address.
     *
     * @deprecated Use object with `walletAddress` property instead.
     */
    data:
      | string
      | {
          walletAddress: string;
          /**
           * If true farms for V2 pools will be present in the response.
           *
           * @default true
           */
          dexV2?: boolean;
        },
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
    /**
     * Wallet address.
     *
     * @deprecated Use object with `walletAddress` property instead.
     */
    data:
      | string
      | {
          walletAddress: string;
          /**
           * If true V2 pools will be present in the response.
           *
           * @default true
           */
          dexV2?: boolean;
        },
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

  public async getWalletVaultsFee(query: { walletAddress: string }) {
    return normalizeResponse(
      await this.apiFetch<{ vault_list: VaultFeeInfo[] }>(
        ...normalizeRequest("/v1/wallets/{walletAddress}/fee_vaults", {
          method: "GET",
          query,
        }),
      ),
    ).vaultList;
  }

  public async getWalletOperations({
    since,
    until,
    ...query
  }: {
    since: Date;
    until: Date;
    walletAddress: string;
    /**
     * If true V2 pool operations will be present in the response.
     *
     * @default true
     */
    dexV2?: boolean;
    opType?: OperationType;
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

  public async getAssetsFeeStats({
    since,
    until,
    referrerAddress,
  }: {
    since: Date;
    until: Date;
    referrerAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<AssetsFeeStatsResponse>(
        ...normalizeRequest("/v1/stats/fees", {
          method: "GET",
          query: {
            since: normalizeDate(since),
            until: normalizeDate(until),
            referrerAddress,
          },
        }),
      ),
    );
  }

  public async getWithdrawalsFeeStats({
    since,
    until,
    referrerAddress,
  }: {
    since: Date;
    until: Date;
    referrerAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ withdrawals: WithdrawalFeeStat[] }>(
        ...normalizeRequest("/v1/stats/fee_withdrawals", {
          method: "GET",
          query: {
            since: normalizeDate(since),
            until: normalizeDate(until),
            referrerAddress,
          },
        }),
      ),
    ).withdrawals;
  }

  public async getAccrualsFeeStats({
    since,
    until,
    referrerAddress,
  }: {
    since: Date;
    until: Date;
    referrerAddress: string;
  }) {
    return normalizeResponse(
      await this.apiFetch<{ operations: OperationFeeStat[] }>(
        ...normalizeRequest("/v1/stats/fee_accruals", {
          method: "GET",
          query: {
            since: normalizeDate(since),
            until: normalizeDate(until),
            referrerAddress,
          },
        }),
      ),
    ).operations;
  }

  public async getRouters(query?: {
    /**
     * If true V2 routers will be present in the response.
     *
     * @default true
     */
    dexV2?: boolean;
  }) {
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
      await this.apiFetch<{ router: RouterInfoResponse }>(
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
