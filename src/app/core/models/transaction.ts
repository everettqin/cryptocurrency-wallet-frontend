import { User } from './user';

export interface Transaction {
  identifier: string;
  amount: number;
  state: string;
  type: string;
  source_user: User;
  target_user_id: User;
  processed_at: Date;
  created_at: Date;
  updated_at: Date;
}
