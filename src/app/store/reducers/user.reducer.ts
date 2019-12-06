import { Action, createReducer, on } from '@ngrx/store';
import { User, Meta, Transaction } from '@app/core';
import * as UserActions from '../actions';

export interface UserState {
  users: User[];
  currentUser?: User;
  transactions: {
    transactions: Transaction[];
    currentTransaction?: Transaction;
    meta: Meta;
    loading: boolean;
    error: boolean;
  };
  meta: Meta;
  loading: boolean;
  error: boolean;
}

export const initialState: UserState = {
  users: [],
  meta: {
    currentPage: 0,
    nextPage: 0,
    prevPage: 0,
    totalPages: 0,
    totalCount: 0
  },
  transactions: {
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
  },
  loading: false,
  error: false
};

function modifyUserState(
  userState: UserState,
  userChanges: Partial<User>
): UserState {
  return {
    ...userState,
    loading: false,
    users: userState.users.map(h => {
      if (h.identifier === userChanges.identifier) {
        return { ...h, ...userChanges };
      } else {
        return h;
      }
    })
  };
}

const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, state => ({ ...state, loading: true })),
  on(UserActions.addUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, { ...user }]
  })),
  on(UserActions.addUserError, state => ({ ...state, loading: false })),
  on(UserActions.getUsers, state => ({ ...state, loading: true })),
  on(UserActions.getUsersError, state => ({ ...state, loading: false })),
  on(UserActions.getUsersSuccess, (state, { users, meta }) => ({
    ...state,
    loading: false,
    users,
    meta
  })),
  on(UserActions.getUser, state => ({ ...state, loading: true })),
  on(UserActions.getUserError, state => ({ ...state, loading: false })),
  on(UserActions.getUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    currentUser: user
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(h => {
      if (h.identifier === user.identifier) {
        state.loading = true;
      }
      return h;
    })
  })),
  on(UserActions.updateUserSuccess, (state, { user }) =>
    modifyUserState(state, user)
  ),
  on(UserActions.updateUserError, (state, { error }) => ({
    ...state,
    users: state.users.map(h => {
      if (h.identifier === error.requestData.identifier) {
        // Huh? No idea what the error is!
        state.error = true;
      }
      return h;
    }),
    loading: false
  })),
  on(UserActions.setUserLoading, (state, { loading }) => ({
    ...state,
    loading: loading == null ? true : loading
  })),
  on(UserActions.getUserTransactions, state => ({
    ...state,
    transactions: {
      ...state.transactions,
      loading: true
    }
  })),
  on(UserActions.getUserTransactionsError, state => ({
    ...state,
    transactions: {
      ...state.transactions,
      loading: false
    }
  })),
  on(
    UserActions.getUserTransactionsSuccess,
    (state, { transactions, meta }) => ({
      ...state,
      transactions: {
        ...state.transactions,
        loading: false,
        transactions,
        meta
      }
    })
  )
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
