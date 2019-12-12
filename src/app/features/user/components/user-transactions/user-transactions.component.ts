import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input
} from '@angular/core';

// App
import { AppBaseComponent, Meta, Transaction, User } from '@app/core';
import { UserDispatchers, UserSelectors } from '@app/store/services';
import { Observable } from 'rxjs';

// Lib
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionNewComponent } from '../../../transaction/components';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-transactions',
  templateUrl: 'user-transactions.component.html'
})
export class UserTransactionsComponent extends AppBaseComponent
  implements OnInit {
  @Input() user: User;

  page: number;
  pageSize: number;
  collectionSize: number;
  userIdentifier: string;

  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  meta$: Observable<Meta>;

  constructor(
    private route: ActivatedRoute,
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
    if (transaction.sourceUser.identifier === this.userIdentifier) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  amountPrefix(transaction: Transaction) {
    if (transaction.sourceUser.identifier === this.userIdentifier) {
      return '+ ' + transaction.amount;
    } else {
      return '- ' + transaction.amount;
    }
  }

  showName(transaction: Transaction) {
    if (transaction.sourceUser.identifier === this.userIdentifier) {
      return transaction.targetUser.name;
    } else {
      return transaction.sourceUser.name;
    }
  }

  getTransactions(page: number = 1) {
    this.userDispatchers.getUserTransactions(page, this.userIdentifier);
  }

  newTransaction() {
    this.modalService.open(TransactionNewComponent);
  }

  ngOnInit() {
    this.userIdentifier = this.route.snapshot.paramMap.get('identifier');
    this.getTransactions();
  }
}
