import { User } from './user';

export interface Transaction {
  id?: string;
  identifier?: string;
  amount: number;
  state?: string;
  currencyType: string;
  sourceUser?: User;
  sourceUserId: string;
  targetUser?: User;
  targetUserId?: string;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
