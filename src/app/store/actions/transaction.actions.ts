import { createAction, props } from '@ngrx/store';

import { Transaction, DataServiceError, Meta } from '@app/core';

export const createTransactionAction = (actionType: string) =>
  createAction(actionType, props<{ transaction: Transaction }>());

export const createTransactionErrorAction = (actionType: string) =>
  createAction(actionType, props<{ error: DataServiceError<Transaction> }>());

export const getTransactions = createAction('[Transaction] GET_TRANSACTIONS');

export const getTransactionsSuccess = createAction(
  '[Transaction] GET_TRANSACTIONS_SUCCESS',
  props<{ transactions: Transaction[]; meta: Meta }>()
);

export const getTransactionsError = createAction(
  '[Transaction] GET_TRANSACTIONS_ERROR',
  props<{ error: any }>()
);

export const addTransaction = createTransactionAction(
  '[Transaction] ADD_TRANSACTION'
);

export const addTransactionSuccess = createTransactionAction(
  '[Transaction] ADD_TRANSACTION_SUCCESS'
);

export const addTransactionError = createTransactionErrorAction(
  '[Transaction] ADD_TRANSACTION_ERROR'
);

export const getTransaction = createAction(
  '[Transaction] GET_TRANSACTION',
  props<{ id: string }>()
);

export const getTransactionSuccess = createTransactionAction(
  '[Transaction] GET_TRANSACTION_SUCCESS'
);

export const getTransactionError = createTransactionErrorAction(
  '[Transaction] GET_TRANSACTION_ERROR'
);

export const updateTransaction = createTransactionAction(
  '[Transaction] UPDATE_TRANSACTION'
);

export const updateTransactionSuccess = createTransactionAction(
  '[Transaction] UPDATE_TRANSACTION_SUCCESS'
);

export const updateTransactionError = createTransactionErrorAction(
  '[Transaction] UPDATE_TRANSACTION_ERROR'
);

export const deleteTransaction = createTransactionAction(
  '[Transaction] DELETE_TRANSACTION'
);

export const deleteTransactionSuccess = createTransactionAction(
  '[Transaction] DELETE_TRANSACTION_SUCCESS'
);

export const deleteTransactionError = createTransactionErrorAction(
  '[Transaction] DELETE_TRANSACTION_ERROR'
);

export const setTransactionLoading = createAction(
  '[Transaction] SET_TRANSACTION_LOADING',
  props<{ loading: boolean }>()
);
