export interface User {
  id?: string;
  identifier?: string;
  name: string;
  description: string;
  email: string;
  bitcoinWalletId?: string;
  bitcoinWalletBalance?: number;
  ethereumWalletId?: string;
  ethereumWalletBalance?: number;
  maxTransactionLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
