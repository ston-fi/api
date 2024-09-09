# Changelog

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
