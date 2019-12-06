import { createAction, props } from '@ngrx/store';

import { User, DataServiceError, Meta, Transaction } from '@app/core';

export const createUserAction = (actionType: string) =>
  createAction(actionType, props<{ user: User }>());

export const createUserErrorAction = (actionType: string) =>
  createAction(actionType, props<{ error: DataServiceError<User> }>());

export const getUsers = createAction(
  '[User] GET_USERS',
  props<{ page: number }>()
);

export const getUsersSuccess = createAction(
  '[User] GET_USERS_SUCCESS',
  props<{ users: User[]; meta: Meta }>()
);

export const getUsersError = createAction(
  '[User] GET_USERS_ERROR',
  props<{ error: any }>()
);

export const addUser = createUserAction('[User] ADD_USER');

export const addUserSuccess = createUserAction('[User] ADD_USER_SUCCESS');

export const addUserError = createUserErrorAction('[User] ADD_USER_ERROR');

export const getUser = createAction(
  '[User] GET_USER',
  props<{ identifier: string }>()
);

export const getUserSuccess = createUserAction('[User] GET_USER_SUCCESS');

export const getUserError = createUserErrorAction('[User] GET_USER_ERROR');

export const updateUser = createUserAction('[User] UPDATE_USER');

export const updateUserSuccess = createUserAction('[User] UPDATE_USER_SUCCESS');

export const updateUserError = createUserErrorAction(
  '[User] UPDATE_USER_ERROR'
);

export const setUserLoading = createAction(
  '[User] SET_USER_LOADING',
  props<{ loading: boolean }>()
);

export const getUserTransactions = createAction(
  '[User] GET_TRANSACTIONS',
  props<{ page: number, userIdentifier: string }>()
);

export const getUserTransactionsSuccess = createAction(
  '[User] GET_TRANSACTIONS_SUCCESS',
  props<{ transactions: Transaction[]; meta: Meta }>()
);

export const getUserTransactionsError = createAction(
  '[User] GET_TRANSACTIONS_ERROR',
  props<{ error: any }>()
);
