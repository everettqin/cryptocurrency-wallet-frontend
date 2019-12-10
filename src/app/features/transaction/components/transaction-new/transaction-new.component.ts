import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// app
import { Transaction, AppBaseComponent } from '@app/core';
import { TransactionDispatchers } from '@app/store';

// ui
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html'
})
export class TransactionNewComponent extends AppBaseComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  newTransaction: Transaction = {
    currencyType: '',
    sourceUserId: '',
    targetUserId: '',
    amount: 0
  };
  maxAmount: number;

  fields: FormlyFieldConfig[] = [
    {
      key: 'currencyType',
      type: 'select',
      templateOptions: {
        type: 'select',
        label: 'Type',
        required: true,
        options: [
          { label: 'Bitcoin', value: 'bitcoin' },
          { label: 'Ethereum', value: 'ethereum' }
        ]
      }
    },
    {
      key: 'sourceUserId',
      validators: {
        fieldMatch: {
          expression: control => {
            const value = control.value;
            return (
              value.targetUserId !== value.sourceUserId ||
              !value.targetUserId ||
              !value.sourceUserId
            );
          },
          message: 'Target and Source User should not be same',
          errorPath: 'targetUserId'
        }
      }
    },
    {
      key: 'sourceUserId',
      type: 'user-select',
      templateOptions: {
        label: 'Source User',
        required: true
      }
    },
    {
      key: 'targetUserId',
      type: 'user-select',
      templateOptions: {
        label: 'Target User',
        required: true
      },
      validators: {
        fieldUnequal: {
          expression: control => {
            const targetUserId = control.value;
            const sourceUserId = this.newTransaction.sourceUserId;
            return (
              targetUserId !== sourceUserId || !targetUserId || !sourceUserId
            );
          },
          message: 'Target and Source User should not be same'
        }
      }
    },
    {
      key: 'amount',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Amount',
        required: true,
        min: 1
      }
    }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private transactionDispatchers: TransactionDispatchers
  ) {
    super();
  }

  submit() {
    this.transactionDispatchers.addTransaction(this.newTransaction);
  }
}
