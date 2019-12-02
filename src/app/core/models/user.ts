export interface User {
  id?: string;
  identifier?: string;
  name: string;
  description: string;
  email: string;
  bitcoin_wallet_id?: string;
  bitcoin_wallet_balance?: number;
  ethereum_wallet_id?: string;
  ethereum_wallet_balance?: number;
  max_transaction_limit?: number;
  created_at?: Date;
  updated_at?: Date;
}
