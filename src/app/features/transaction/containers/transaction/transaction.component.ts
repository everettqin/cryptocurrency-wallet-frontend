import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Transaction, AppBaseComponent } from '@app/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TransactionDispatchers, TransactionSelectors } from '@app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent extends AppBaseComponent implements OnInit {
  transaction$: Observable<Transaction>;

  constructor(
    private route: ActivatedRoute,
    private transactionDispatchers: TransactionDispatchers,
    private transactionSelector: TransactionSelectors
  ) {
    super();

    this.transaction$ = this.transactionSelector.transaction$;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transactionDispatchers.getTransaction(params.identifier);
    });
  }
}
