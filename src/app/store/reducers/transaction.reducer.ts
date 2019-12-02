import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from '@app/core';
import * as TransactionActions from '../actions';

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: boolean;
}

export const initialState: TransactionState = {
  transactions: [],
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
  on(TransactionActions.addTransactionError, state => ({ ...state, loading: false })),
  on(TransactionActions.getTransactions, state => ({ ...state, loading: true })),
  on(TransactionActions.getTransactionsError, state => ({ ...state, loading: false })),
  on(TransactionActions.getTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    loading: false,
    transactions
  })),
  on(TransactionActions.deleteTransaction, (state, { transaction }) => ({
    ...state,
    loading: false,
    transactions: state.transactions.filter(h => h !== transaction)
  })),
  on(TransactionActions.deleteTransactionSuccess, state => ({ ...state, loading: false })),
  on(TransactionActions.deleteTransactionError, (state, { error }) => ({
    ...state,
    transactions: [...state.transactions, error.requestData],
    loading: false
  })),
  on(TransactionActions.updateTransaction, (state, { transaction }) => ({
    ...state,
    transactions: state.transactions.map(h => {
      if (h.identifier === transaction.identifier) {
        state.loading = true;
      }
      return h;
    })
  })),
  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) =>
    modifyTransactionState(state, transaction)
  ),
  on(TransactionActions.updateTransactionError, (state, { error }) => ({
    ...state,
    transactions: state.transactions.map(h => {
      if (h.identifier === error.requestData.identifier) {
        // Huh? No idea what the error is!
        state.error = true;
      }
      return h;
    }),
    loading: false
  })),
  on(TransactionActions.setTransactionLoading, (state, { loading }) => ({
    ...state,
    loading: loading == null ? true : loading
  }))
);

export function reducer(state: TransactionState | undefined, action: Action) {
  return transactionReducer(state, action);
}
