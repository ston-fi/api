# Changelog

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
