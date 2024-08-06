import { StonApiClient, type StonApiClientOptions } from "./client/apiClient";

export { StonApiClient, type StonApiClientOptions };

export { AssetKind, AssetTag } from "./client/types/asset";
export type {
  OperationType,
  OperationTypeParam,
  OperationDetails,
} from "./client/types/operation";
export type AssetInfo = Awaited<ReturnType<StonApiClient["getAssets"]>>[number];
export type FarmInfo = Awaited<ReturnType<StonApiClient["getFarms"]>>[number];
export type FarmNftInfo = FarmInfo["nftInfos"][number];
export type OperationInfo = Awaited<
  ReturnType<StonApiClient["getWalletOperations"]>
>[number];
export type PoolInfo = Awaited<ReturnType<StonApiClient["getPools"]>>[number];
export type SwapSimulation = Awaited<ReturnType<StonApiClient["simulateSwap"]>>;
export type SwapStatus = Awaited<ReturnType<StonApiClient["getSwapStatus"]>>;
export type SwapPair = Awaited<
  ReturnType<StonApiClient["getSwapPairs"]>
>[number];
