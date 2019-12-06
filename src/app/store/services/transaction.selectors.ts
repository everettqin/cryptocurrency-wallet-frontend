import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityState } from '../reducers';
import { Transaction } from '@app/core';
import * as TransactionAction from '../actions';
import { TransactionState } from '../reducers/transaction.reducer';

// selectors
const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getTransactionState = createSelector(
  getEntityState,
  (state: EntityState) => state.transactions
);

const getAllTransactions = createSelector(
  getTransactionState,
  (state: TransactionState) => state.transactions
);

const getCurrentTransaction = createSelector(
  getTransactionState,
  (state: TransactionState) => state.currentTransaction
);

const getTransactionsLoading = createSelector(
  getTransactionState,
  (state: TransactionState) => state.loading
);

const getMeta = createSelector(
  getTransactionState,
  (state: TransactionState) => state.meta
);

@Injectable()
export class TransactionSelectors {
  constructor(private store: Store<EntityState>) {}
  // selectors$
  transactions$ = this.store.select(getAllTransactions);
  transaction$ = this.store.select(getCurrentTransaction);
  transactionState$ = this.store.select(getTransactionState);
  loading$ = this.store.select(getTransactionsLoading);
  meta$ = this.store.select(getMeta);
}
