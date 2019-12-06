import { Component, Input } from '@angular/core';

// App
import { Transaction, AppBaseComponent } from '@app/core';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html'
})
export class TransactionDetailComponent extends AppBaseComponent {
  @Input() transaction: Transaction;

  constructor(  ) {
    super();
  }
}
