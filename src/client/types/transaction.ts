export type TxId = {
  lt: number;
  hash: string;
  contract_address?: string;
};

export type WalletTxIdResponse = {
  tx_id?: TxId;
  wallet_seqno?: number;
};
