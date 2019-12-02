import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@app/core';
import * as UserAction from '../actions';
import { EntityState } from '../reducers';

@Injectable()
export class UserDispatchers {
  constructor(private store: Store<EntityState>) {}

  addUser(user: User) {
    this.store.dispatch(UserAction.addUser({ user }));
  }

  updateUser(user: User) {
    this.store.dispatch(UserAction.updateUser({ user }));
  }

  getUsers(page: number) {
    this.store.dispatch(UserAction.getUsers({page}));
  }

  getUser(identifier: string) {
    this.store.dispatch(UserAction.getUser({identifier}));
  }
}
