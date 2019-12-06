import { User } from './user';
import { Version } from './version';

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
  versions?: Version;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
