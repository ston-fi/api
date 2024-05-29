export type SwapSimulationResponse = {
  ask_address: string;
  ask_jetton_wallet: string;
  ask_units: string;
  fee_address: string;
  fee_percent: string;
  fee_units: string;
  min_ask_units: string;
  offer_address: string;
  offer_jetton_wallet: string;
  offer_units: string;
  pool_address: string;
  price_impact: string;
  router_address: string;
  slippage_tolerance: string;
  swap_rate: string;
};

export type SwapStatusResponse =
  | {
      "@type": "NotFound";
    }
  | {
      "@type": "Found";
      address: string;
      balance_deltas: string;
      coins: string;
      exit_code: string;
      logical_time: string;
      query_id: string;
      tx_hash: string;
    };
