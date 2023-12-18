import { StonApiClient } from "./client/apiClient";

export { StonApiClient, type StonApiClientOptions } from "./client/apiClient";

export { AssetKind } from "./client/types/asset";
export type AssetInfo = Awaited<ReturnType<StonApiClient["getAssets"]>>[number];
export type FarmInfo = Awaited<ReturnType<StonApiClient["getFarms"]>>[number];
export type FarmNftInfo = FarmInfo["nftInfos"][number];
export type PoolInfo = Awaited<ReturnType<StonApiClient["getPools"]>>[number];
