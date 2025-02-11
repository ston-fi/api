import type { StonApiClient } from "./client/apiClient";

export { StonApiClient, type StonApiClientOptions } from "./client/apiClient";
export { AssetKind, AssetTag } from "./client/types/asset";
export { OperationType } from "./client/types/operation";
export { LiquidityProvisionType } from "./client/types/liquidityProvision";

export type AssetInfo = Awaited<ReturnType<StonApiClient["getAssets"]>>[number];
export type AssetInfoV2 = Awaited<
  ReturnType<StonApiClient["queryAssets"]>
>[number];
export type FarmInfo = Awaited<ReturnType<StonApiClient["getFarms"]>>[number];
export type FarmNftInfo = FarmInfo["nftInfos"][number];
export type PoolInfo = Awaited<ReturnType<StonApiClient["getPools"]>>[number];
export type SwapSimulation = Awaited<ReturnType<StonApiClient["simulateSwap"]>>;
export type SwapStatus = Awaited<ReturnType<StonApiClient["getSwapStatus"]>>;
export type SwapPair = Awaited<
  ReturnType<StonApiClient["getSwapPairs"]>
>[number];
export type OperationInfo = Awaited<
  ReturnType<StonApiClient["getOperations"]>
>[number];
export type RouterInfo = Awaited<
  ReturnType<StonApiClient["getRouters"]>
>[number];
export type LiquidityProvisionSimulation = Awaited<
  ReturnType<StonApiClient["simulateLiquidityProvision"]>
>;
