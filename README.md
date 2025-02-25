<div align="center">
 <h1>STON.fi API</h1>
</div>

[![License](https://img.shields.io/npm/l/@ston-fi/api)](https://img.shields.io/npm/l/@ston-fi/api)
[![npm version](https://img.shields.io/npm/v/@ston-fi/api/latest.svg)](https://www.npmjs.com/package/@ston-fi/api/v/latest)

TypeScript wrapper on top of the [Ston.fi Http API](https://api.ston.fi/swagger-ui)

## Installation

### NPM

```bash
npm install @ston-fi/api
```

### Yarn

```bash
yarn add @ston-fi/api
```

### PNPM

```bash
pnpm install @ston-fi/api
```

## Configuration

Zero config required, you can just create an instance

Optional configuration are also possible by providing an object of type `StonApiClientOptions` to the constructor

```ts
import { StonApiClient } from '@ston-fi/api';

const client = new StonApiClient();
```

## Usage

```ts
// * routers

// get list of all available routers
const routers = await client.getRouters();

// get router by address
const router = await client.getRouter('EQ...');

// * assets

// get list of all DEX assets
const assets = await client.getAssets();

// get asset info by it address
const asset = await client.getAsset('EQ...');

// get list of all DEX assets based on query condition
const assets = await client.queryAssets({
  condition: [
    AssetTag.Essential,
    AssetTag.Popular,
    AssetTag.WalletHasBalance,
  ].join(' | '),
  walletAddress: 'UQ...',
});

// search assets across of all DEX assets based on search string and query condition
const matchedAssets = await client.searchAssets({
  searchString: "USD",
    condition: [
    AssetTag.LiquidityVeryHigh,
    AssetTag.LiquidityHigh, 
  ].join(' | '),
  walletAddress: "UQ...",
});

// get list of all DEX assets with balances for a given wallet
const walletAssets = await client.getWalletAssets('UQ...');

// get asset info by it address with balance for a given wallet
const walletAsset = await client.getWalletAsset({ assetAddress: 'EQ...', walletAddress: 'UQ...' });

// * pools

// get list of all DEX pools
const pools = await client.getPools();

// get list of all DEX pools based on query condition
const pools = await client.queryPools({
  condition: `${AssetTag.LiquidityVeryHigh} | ${AssetTag.LiquidityHigh} | ${AssetTag.Popular}`,
  walletAddress: 'UQ...',
});

// get list of pools with the given asset pair
const pools = await client.getPoolsByAssetPair({
  asset0Address: "EQ...",
  asset1Address: "EQ...",
});

// get pool info by it address
const pool = await client.getPool('EQ...');

// get list of all DEX pools with balances for a given wallet
const walletPools = await client.getWalletPools('UQ...');

// get pool info by it address with balance for a given wallet
const walletPool = await client.getWalletPool({ poolAddress: 'EQ...', walletAddress: 'UQ...' });

// * farms

// get list of all DEX farms
const farms = await client.getFarms();

// get farm info by it address
const farm = await client.getFarm('EQ...');

// get list of all DEX farms with balances for a given wallet
const walletFarms = await client.getWalletFarms('UQ...');

// get farm info by it address with balance for a given wallet
const walletFarm = await client.getWalletFarm({ farmAddress: 'EQ...', walletAddress: 'UQ...' });

// get list of all DEX farms for a given pool
const poolFarms = await client.getFarmsByPool('EQ...');

// * swaps

// get list of tuples with all possible swap pairs on the DEX
const pairs = await client.getSwapPairs();

// simulate direct swap between two assets (sell asset for another)
const swapDirectSimulation = await client.simulateSwap({ /** */ });

// simulate reverse swap between two assets (buy asset for another)
const swapReverseSimulation = await client.simulateReverseSwap({ /** */ });

// get swap status by it id and some additional info (e.g. wallet address, etc.)
const swapStatus = await client.getSwapStatus({ /** */ });

// * liquidity provision

// Simulate new pool creation with a ratio based on provided token amounts
const initialLiquidityProvision = await client.simulateLiquidityProvision({
  provisionType: LiquidityProvisionType.Initial,
  slippageTolerance: '0.001',
  tokenA: 'EQ...',
  tokenB: 'EQ...',
  tokenAUnits: '1000',
  tokenBUnits: '1000',
});

// Simulate adding liquidity to an existing pool at the current pool ratio
// Only one amount is required; Corresponding second amount will be calculated during the simulation
const balancedLiquidityProvision = await client.simulateLiquidityProvision({
  provisionType: LiquidityProvisionType.Balanced,
  poolAddress: 'EQ...',
  slippageTolerance: '0.001',
  tokenA: 'EQ...',
  tokenB: 'EQ...',
  tokenAUnits: '1000',
});

// Simulate adding liquidity with an arbitrary ratio based on provided token amounts
// During provisioning, your funds will be swapped to match the required pool ratio
const arbitraryLiquidityProvision = await client.simulateLiquidityProvision({
  provisionType: LiquidityProvisionType.Arbitrary,
  poolAddress: 'EQ...',
  slippageTolerance: '0.001',
  tokenA: 'EQ...',
  tokenB: 'EQ...',
  tokenAUnits: '1000',
  tokenBUnits: '2000',
});

// Simulate single side adding liquidity
// Is a special case of arbitrary liquidity provision when the ratio is 100 to 0
const arbitrarySinglesideLiquidityProvision = await client.simulateLiquidityProvision({
  provisionType: LiquidityProvisionType.Arbitrary,
  tokenA: 'EQ...',
  tokenB: 'EQ...',
  poolAddress: 'EQ...',
  slippageTolerance: '0.001',
  tokenAUnits: '1000',
  tokenBUnits: '0', // require explicit zero value
});

// * operations

// get list of ALL operations during specified period of time on the platform
const operations = await client.getOperations({
  since: new Date('2024-08-05T12:00:00'),
  until: new Date('2024-08-06T21:00:00')
});

// get list of operations during specified period of time for a given wallet
const operations = await client.getWalletOperations({
  since: new Date('2024-06-01T12:00:00'),
  until: new Date('2024-08-06T21:00:00'),
  walletAddress: 'UQ...',
  opType: OperationType.Swap, // optional; Only operations with the specified types. All operations if the opType is not specified
});
```

## Roadmap

- and js-dock for each method
- add more options in configuration
  - ? interceptors via [ofetch](https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-interceptors)
  - ? retry via [ofetch](https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-auto-retry)
  - ? support request abortion via AbortController
