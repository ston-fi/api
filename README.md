<div align="center">
 <h1>STON.fi API</h1>
</div>

[![License](https://img.shields.io/npm/l/@ston-fi/api)](https://img.shields.io/npm/l/@ston-fi/api)
[![npm version](https://img.shields.io/npm/v/@ston-fi/api/latest.svg)](https://www.npmjs.com/package/@ston-fi/api/v/latest)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40ston-fi/api)

JavaScript wrapper on top of the [Ston.fi Http API](https://api.ston.fi/swagger-ui)

## Installation

```shell
npm install @ston-fi/api

yarn add @ston-fi/api
```

## Configuration

Zero config required, you can just create an instance.

Optional configuration are also possible by providing an object of type `StonApiClientOptions` to the constructor

```ts
import { StonApiClient } from '@ston-fi/api';

const client = new StonApiClient();
```

## Usage

```ts
// get list of all assets listed on DEX
const assets = await client.getAssets();

// get list of all assets listed on DEX with balances for a given wallet
const walletAssets = await client.getWalletAssets('EQ...')
```

## Roadmap

- add missed methods. You can find the list of currently available methods [here](https://github.com/ston-fi/api/blob/main/src/client/apiClient.ts).
  - `/dex`
    - `/reverse_swap/simulate`
    - `/swap/simulate`
    - `/swap/status`
  - `/stats`
  - `/wallets`
    - `/{addr_str}/operations`
  - `/export`
- and js-dock for each method
- add more options in configuration
  - ? interceptors via [ofetch](https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-interceptors)
  - ? retry via [ofetch](https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-auto-retry)
  - ? request abort controller
  - ? controlled case `"camel" | "snake"`
