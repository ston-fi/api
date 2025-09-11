import type { StonApiClient } from "./client/apiClient";

export { StonApiClient, type StonApiClientOptions } from "./client/apiClient";
export { AssetKind, AssetTag } from "./client/types/asset";
export { LiquidityProvisionType } from "./client/types/liquidityProvision";
export { OperationType } from "./client/types/operation";
export { StakeNftStatus } from "./client/types/stake";

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
export type AssetFeeStat = Awaited<
  ReturnType<StonApiClient["getAssetsFeeStats"]>
>["assetsFeeStats"][number];
export type WithdrawalFeeStat = Awaited<
  ReturnType<StonApiClient["getWithdrawalsFeeStats"]>
>[number];
export type OperationFeeStat = Awaited<
  ReturnType<StonApiClient["getAccrualsFeeStats"]>
>[number];
export type VaultFeeInfo = Awaited<
  ReturnType<StonApiClient["getWalletVaultsFee"]>
>[number];
export type WalletStakesInfo = Awaited<
  ReturnType<StonApiClient["getWalletStakes"]>
>;
export type StakeNft = NonNullable<WalletStakesInfo["nfts"]>[number];
export type StakingStats = Awaited<
  ReturnType<StonApiClient["getStakingStats"]>
>;
