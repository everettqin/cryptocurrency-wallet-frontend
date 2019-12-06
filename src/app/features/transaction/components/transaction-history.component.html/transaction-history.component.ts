import { Component, Input } from '@angular/core';

// App
import { Version, AppBaseComponent } from '@app/core';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html'
})
export class TransactionHistoryComponent extends AppBaseComponent {
  @Input() versions: Version[];

  constructor(  ) {
    super();
  }
}
