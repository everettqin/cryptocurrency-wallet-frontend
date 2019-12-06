import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '@app/core';
import * as TransactionAction from '../actions';
import { EntityState } from '../reducers';

@Injectable()
export class TransactionDispatchers {
  constructor(private store: Store<EntityState>) {}

  addTransaction(transaction: Transaction) {
    this.store.dispatch(TransactionAction.addTransaction({ transaction }));
  }

  getTransactions(page: number) {
    this.store.dispatch(TransactionAction.getTransactions({page}));
  }

  getTransaction(identifier: string) {
    this.store.dispatch(TransactionAction.getTransaction({identifier}));
  }
}
