# Changelog

## [0.28.0]

### Added
- `AssetInfo` & `AssetInfoV2` types was extended with
  - new optional field `scale`
  - new optional `scaled-ui` extensions list value
- new `AssetTag.Scaled` was added

## [0.27.1]

### Changed
  - `queryAssets` method parameters now use POST method body instead of search parameters
  - `searchAssets` method now uses `queryAssets` under the hood
  - the package manager was changed to pnpm@10, and workspace settings were configured to prevent installation of recently published packages. This change, along with explicitly fixed dependency versions, should minimize the risk of publishing packages that depend on a recently published newer version of a dependency
  - the build tool was changed from [tsup](https://tsup.egoist.dev/) to [tsdown](https://tsdown.dev/)

## [0.26.0]

### Added
- `queryTransactions` method was added to help find recent transactions by `walletAddress + queryId` or `extMsgHash`

### Changed
- `queryAssets` method parameters were extended with new fields:
  - `searchTerms`
  - `sortBy`
  - `limit`
- `queryPools` method parameters were extended with new fields:
  - `searchTerms`
  - `sortBy`
  - `limit`

### Deprecated
- `searchAssets` method was deprecated. Consider using the `queryAssets` method instead.

## [0.25.1]

- upgraded pnpm to v10
- updated dependencies with security vulnerabilities

## [0.25.0]

### Added
  - `StonApiClient.getWalletStakes` method
  - `StonApiClient.getStakingStats` method

### Changed
  - updated package exports declaration
  - updated dev dependencies
  - dropped `baseURL` search params carrying to the API calls

## [0.24.0]

### Added

- `simulateSwap` method parameters were extended with new fields:
  - `poolAddress`

- `simulateReverseSwap` method parameters were extended with new fields:
  - `poolAddress`

- `SwapSimulationResponse` was extended with new fields:
  - `recommendedSlippageTolerance` Recommended difference between the original price of the order and the final price (considering potential sandwich attack)
  - `recommendedMinAskUnits` Recommended minimal amount of ask units (considering potential sandwich attack)
  - `swapRate`
  - `gasParams`
    - `gasBudget` Optional TON gas budget for transaction
    - `forwardGas` Forward TON amount for transaction
    - `estimatedGasConsumption` Estimated gas consumption

- `PoolInfoResponse` was extended with new fields:
  - `amp` Stable swap amplification parameter
  - `rate` Stable token ratio parameter
  - `w0` Token 0 weight parameter

## [0.23.0]

### Added
- `StonApiClient.getWalletVaultsFee` method
- `StonApiClient.getAssetsFeeStats` method
- `StonApiClient.getWithdrawalsFeeStats` method
- `StonApiClient.getAccrualsFeeStats` method
- `LiquidityProvisionSimulationResponse` was extended with new fields:
  - `estimated_token_a_units`
  - `estimated_token_b_units`

## [0.22.0]

### Added

- `PoolInfoResponse` was extended with new fields:
  - `volume_24h_usd`

- `LiquidityProvisionSimulationResponse` was extended with new fields:
  - `estimated_token_a_rate`
  - `estimated_token_b_rate`
  - `price_impact`

- `FarmInfoResponse` was extended with new fields:
  - `version`
  - `rewards`
  - `locked_total_lp`
  - `locked_total_lp_usd`
  - `all_rewards_distributed`
  - `meta`
  - `owner_address`
  - `custodian_address`
  - `create_timestamp`

- `FarmNftInfoResponse` was extended with a new field:
  - `unstake_timestamp`

### Changed

- `LiquidityProvisionSimulationResponse` field `lp_account_address` now correctly typed as optional.

### Removed

- `FarmInfoResponse` field `reward_token_address` was removed. Since v3 farms can distribute multiple rewards, use the `rewards` field instead to access information about each farm reward pool

## [0.21.0]

### Added

- new optional `dexVersion` parameter for `simulateSwap` & `simulateReverseSwap` methods
- updated JsDock comments for the `dexV2` parameter in methods where it used

## [0.20.0]

### Added

- new `asset:essential` AssetTag

## [0.19.0]

### Added

- `simulateLiquidityProvision` method for simulation of pool creation/deposit operations

## [0.18.0]

- the package build config was updated to fix the CJS version of the package on node < 22.
- dev dependecies was updated

## [0.17.0]

### Added

- `getPoolsByAssetPair` method for getting a list of the pools for a given pair of assets

## [0.16.0]

### Added
- asset info that returns from asset-related methods was extended with the `popularityIndex` filed. This index is calculated based on the TVL of the pools with this asset on DEX. It could be used to be one of the ways to sort assets

## [0.15.0]

### Changed

- [ofecth](https://github.com/unjs/ofetch/releases) dependency was updated from `1.3.4` to the latest `1.4.1` version
- package build tool was changed from [vite](https://github.com/vitejs/vite) to [tsup](https://github.com/egoist/tsup) for better type declaration. Now we are successfully passing the [arethetypeswrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io) checks

### Added
- added missed package description fields to the `package.json` file. Now we are successfully passing the [publint](https://github.com/bluwy/publint) checks

### Fixed

- correct type declaration for `getWalletOperations.opType` parameter. Now you can use values from `OperationType` enum instead of strings

## [0.14.0]

- `simulateSwap` & `simulateReverseSwap` method parameters extended with the optional `referralFeeBps` filed
- `simulateSwap` & `simulateReverseSwap` method parameters documented with JSDoc comments

## [0.13.1]

### Fixed

- remove sending of the `offer_units` parameter in the `simulateSwap` request alongside with the `units` parameter
- remove sending sending of the `ask_units` parameter in the `simulateReverseSwap` request alongside with the `units` parameter

## [0.13.0]

### Added

- the `RouterInfo` structure was extended with `pool_creation_enabled` field
- the `AssetInfo.tags` was moved to the new tags format. See `AssetTag` enum
- `searchAssets` method parameters were extended with the optional `unconditionalAssets`
- new `StonApiClient.queryPools` method

## [0.12.1]

### Fixed

- fix `getRouters` response type declaration

## [0.12.0]

### Added
- The `AssetInfo` structure was extended with `extensions` & `custom_payload_api_uri` fields (fields for Mintless Jetton's)
- The `AssetInfoV2Response` structure was extended with `extensions` & `meta.custom_payload_api_uri` fields (fields for Mintless Jetton's)
- `StonApiClient.getRouters` method
- `StonApiClient.getRouter` method
- Most API methods now accept the optional `dexV2` parameter. If this parameter is passed to the API method, the response will contain v1 AND v2 addresses (for example, `StonApiClient.getRouters()` will return only an array of v1 routers, and `StonApiClient.getRouters({ dexV2: true })` will return an array of v1 and v2 routers). The same logic applies to all other methods where this parameter was added. By default, this parameter is set to `false` and is needed to force users to explicitly confirm that they are ready to receive v2 addresses from the API
  - `StonApiClient.getRouters`
  - `StonApiClient.getSwapPairs`
  - `StonApiClient.simulateSwap`
  - `StonApiClient.simulateReverseSwap`
  - `StonApiClient.getPools`
  - `StonApiClient.getWalletPools`
  - `StonApiClient.getFarms`
  - `StonApiClient.getWalletFarms`
  - `StonApiClient.getWalletOperations`

## [0.10.0]

### Added

- `AssetInfo` structure was extended with a `tags` field
- `StonApiClient.queryAssets` method
- `StonApiClient.searchAssets` method
- `StonApiClient.getWalletOperations` method
- `StonApiClient.getOperationsStats` method

## [0.9.0]

### Added

- `StonApiClient.getAsset` method
- `StonApiClient.getWalletAsset` method
- `StonApiClient.getPool` method
- `StonApiClient.getWalletPool` method
- `StonApiClient.getFarm` method
- `StonApiClient.getWalletFarm` method
- `StonApiClient.getFarmsByPool` method
- `AssetInfo.priority` field
- `SwapSimulation.askJettonWallet`, `SwapSimulation.offerJettonWallet` field
- `FarmNftInfo.rewards` field

### Fixed

- fix `getWalletFarms` method URL

## [0.8.0]

### Added

- `StonApiClient.getSwapPairs()` method
- `StonApiClient.simulateSwap()` method
- `StonApiClient.simulateReverseSwap()` method
- `StonApiClient.getSwapStatus()` method

### Deprecated

- `baseUrl` client option deprecated. Expected `baseURL` to be used instead

## [0.7.0]

### Added

- `StonApiClient.getAssets()` method
- `StonApiClient.getFarms()` method
- `StonApiClient.getPools()` method
- `StonApiClient.getJettonWalletAddress()` method
- `StonApiClient.getWalletAssets()` method
- `StonApiClient.getWalletFarms()` method
- `StonApiClient.getWalletPools()` method
