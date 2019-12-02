import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './user.reducer';
import * as fromTransactions from './transaction.reducer';

export interface EntityState {
  users: fromUsers.UserState;
  transactions: fromTransactions.TransactionState;
}

export const reducers: ActionReducerMap<EntityState> = {
  users: fromUsers.reducer,
  transactions: fromTransactions.reducer
};
