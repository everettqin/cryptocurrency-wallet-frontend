import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// app
import { Transaction, AppBaseComponent } from '@app/core';
import { TransactionDispatchers } from '@app/store';
import {UserDataService} from '@app/resources';
// ui
import { FormlyFieldConfig } from '@ngx-formly/core';
import { concat, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html'
})
export class TransactionDetailComponent extends AppBaseComponent {
  @Input() transaction: Transaction;

  transactions$: Observable<any[]>;

  model: any = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      template:
        '<h6 class="heading-small text-muted mb-4">Transaction information</h6>'
    },
    {
      fieldGroupClassName: 'pl-lg-4 d-block',
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-6',
              key: 'sourceUserId',
              type: 'user-select',
              templateOptions: {
                label: 'Name'
              }
            }
          ]
        }
      ]
    }
  ];

  constructor(  ) {
    super();
  }
}
