import { Action, createReducer, on } from '@ngrx/store';
import { Transaction, Meta } from '@app/core';
import * as TransactionActions from '../actions';

export interface TransactionState {
  transactions: Transaction[];
  currentTransaction?: Transaction;
  meta: Meta;
  loading: boolean;
  error: boolean;
}

export const initialState: TransactionState = {
  transactions: [],
  meta: {
    currentPage: 0,
    nextPage: 0,
    prevPage: 0,
    totalPages: 0,
    totalCount: 0
  },
  loading: false,
  error: false
};

function modifyTransactionState(
  transactionState: TransactionState,
  transactionChanges: Partial<Transaction>
): TransactionState {
  return {
    ...transactionState,
    loading: false,
    transactions: transactionState.transactions.map(h => {
      if (h.identifier === transactionChanges.identifier) {
        return { ...h, ...transactionChanges };
      } else {
        return h;
      }
    })
  };
}

const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.addTransaction, state => ({ ...state, loading: true })),
  on(TransactionActions.addTransactionSuccess, (state, { transaction }) => ({
    ...state,
    loading: false,
    transactions: [...state.transactions, { ...transaction }]
  })),
  on(TransactionActions.addTransactionError, state => ({
    ...state,
    loading: false
  })),
  on(TransactionActions.getTransactions, state => ({
    ...state,
    loading: true
  })),
  on(TransactionActions.getTransactionsError, state => ({
    ...state,
    loading: false
  })),
  on(TransactionActions.getTransactionsSuccess, (state, { transactions, meta }) => ({
    ...state,
    loading: false,
    transactions,
    meta
  })),
  on(TransactionActions.getTransaction, state => ({ ...state, loading: true })),
  on(TransactionActions.getTransactionError, state => ({ ...state, loading: false })),
  on(TransactionActions.getTransactionSuccess, (state, { transaction }) => ({
    ...state,
    loading: false,
    currentTransaction: transaction
  })),
  on(TransactionActions.setTransactionLoading, (state, { loading }) => ({
    ...state,
    loading: loading == null ? true : loading
  }))
);

export function reducer(state: TransactionState | undefined, action: Action) {
  return transactionReducer(state, action);
}
