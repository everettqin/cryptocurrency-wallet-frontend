import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AppBaseComponent, Meta, Transaction } from '@app/core';
import {
  TransactionDispatchers,
  TransactionSelectors
} from '@app/store/services';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionNewComponent } from '../../components';

@Component({
  selector: 'app-transactions',
  templateUrl: 'transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent extends AppBaseComponent implements OnInit {
  page: number;
  pageSize: number;
  collectionSize: number;

  transactions$: Observable<Transaction[]>;
  meta$: Observable<Meta>;
  loading$: Observable<boolean>;

  constructor(
    private transactionDispatchers: TransactionDispatchers,
    private transactionSelectors: TransactionSelectors,
    private modalService: NgbModal
  ) {
    super();

    this.transactions$ = this.transactionSelectors.transactions$;
    this.loading$ = this.transactionSelectors.loading$;
    this.meta$ = this.transactionSelectors.meta$;
  }

  getTransactions(page: number = 1) {
    this.transactionDispatchers.getTransactions(page);
  }

  newTransaction() {
    this.modalService.open(TransactionNewComponent);
  }

  ngOnInit() {
    this.getTransactions();
  }
}
