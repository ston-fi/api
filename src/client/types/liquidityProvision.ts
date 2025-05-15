export const LiquidityProvisionType = {
  /**
   * Create new pool (requires both token amounts)
   */
  Initial: "Initial",
  /**
   * Add to existing pool at current ratio (auto-calculates one token amount)
   */
  Balanced: "Balanced",
  /**
   * Add liquidity in any ratio to existing pool (requires explicit amounts)
   */
  Arbitrary: "Arbitrary",
} as const;

export type LiquidityProvisionType =
  (typeof LiquidityProvisionType)[keyof typeof LiquidityProvisionType];

export type LiquidityProvisionSimulationQuery = {
  tokenA: string;
  tokenB: string;
  /**
   * The maximum possible difference between the rates that we expect and which will actually be,
   * in fractions (for example, 0.001 is 0.1%)
   *
   * Recommended value is 0.01 (1%)
   */
  slippageTolerance: string;
  /**
   * User's wallet address for balance checks (optional).
   * When provided, returns current LP account balances if exists.
   */
  walletAddress?: string;
} & (
  | {
      provisionType: Extract<LiquidityProvisionType, "Initial">;
      tokenAUnits: string;
      tokenBUnits: string;
    }
  | {
      provisionType: Extract<LiquidityProvisionType, "Balanced">;
      poolAddress: string;
      tokenAUnits: string;
      tokenBUnits?: never;
    }
  | {
      provisionType: Extract<LiquidityProvisionType, "Balanced">;
      poolAddress: string;
      tokenAUnits?: never;
      tokenBUnits: string;
    }
  | {
      provisionType: Extract<LiquidityProvisionType, "Arbitrary">;
      poolAddress: string;
      tokenAUnits: string;
      tokenBUnits: string;
    }
);

export type LiquidityProvisionSimulationResponse = {
  provision_type: LiquidityProvisionType;
  router_address: string;
  pool_address: string;
  token_a: string;
  token_b: string;
  token_a_units: string;
  token_b_units: string;
  lp_account_address?: string | null;
  lp_account_token_a_balance: string;
  lp_account_token_b_balance: string;
  estimated_lp_units: string;
  min_lp_units: string;
  min_token_a_units: string;
  min_token_b_units: string;
  estimated_token_a_rate: string;
  estimated_token_b_rate: string;
  lp_total_supply: string;
  price_impact: string;
};
