import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityState } from '../reducers';
import { User } from '@app/core';
import * as UserAction from '../actions';
import { UserState } from '../reducers/user.reducer';

// selectors
const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getUserState = createSelector(
  getEntityState,
  (state: EntityState) => state.users
);

const getAllUsers = createSelector(
  getUserState,
  (state: UserState) => state.users
);

const getCurrentUser = createSelector(
  getUserState,
  (state: UserState) => state.currentUser
);

const getUsersLoading = createSelector(
  getUserState,
  (state: UserState) => state.loading
);


const getMeta = createSelector(
  getUserState,
  (state: UserState) => state.meta
);

@Injectable()
export class UserSelectors {
  constructor(private store: Store<EntityState>) {}
  // selectors$
  users$ = this.store.select(getAllUsers);
  user$ = this.store.select(getCurrentUser);
  userState$ = this.store.select(getUserState);
  loading$ = this.store.select(getUsersLoading);
  meta$ = this.store.select(getMeta);
}
