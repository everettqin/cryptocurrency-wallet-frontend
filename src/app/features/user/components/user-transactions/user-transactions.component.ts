import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input
} from '@angular/core';

import { AppBaseComponent, Meta, Transaction, User } from '@app/core';
import {
  TransactionDispatchers,
  TransactionSelectors,
  UserDispatchers,
  UserSelectors
} from '@app/store/services';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionNewComponent } from '../../../transaction/components';
import { TransactionDataService } from '@app/resources';

@Component({
  selector: 'app-user-transactions',
  templateUrl: 'user-transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTransactionsComponent extends AppBaseComponent
  implements OnInit {
  @Input() user: User;

  page: number;
  pageSize: number;
  collectionSize: number;

  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  meta$: Observable<Meta>;

  constructor(
    private userDispatchers: UserDispatchers,
    private userSelectors: UserSelectors,
    private modalService: NgbModal
  ) {
    super();

    this.transactions$ = this.userSelectors.transactions$;
    this.loading$ = this.userSelectors.transactionsLoading$;
    this.meta$ = this.userSelectors.transactionsMeta$;
  }

  color(transaction: Transaction) {
    if (transaction.sourceUserId === this.user.id) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  showName(transaction: Transaction) {
    if (transaction.sourceUserId === this.user.id) {
      return transaction.targetUser.name;
    } else {
      return transaction.sourceUser.name;
    }
  }

  getTransactions(page: number = 1) {
    this.userDispatchers.getUserTransactions(page, this.user.identifier);
  }

  newTransaction() {
    this.modalService.open(TransactionNewComponent);
  }

  ngOnInit() {
    this.getTransactions();
  }
}
