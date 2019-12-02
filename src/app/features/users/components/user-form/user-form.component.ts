import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// app
import { User, AppBaseComponent } from '@app/core';

// ui
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserDispatchers } from '@app/store';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent extends AppBaseComponent {
  @Input() user: User;

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      template:
        '<h6 class="heading-small text-muted mb-4">User information</h6>'
    },
    {
      fieldGroupClassName: 'pl-lg-4 d-block',
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-6',
              key: 'name',
              type: 'input',
              templateOptions: {
                label: 'Name',
                required: true,
                maxLength: 512
              }
            },
            {
              className: 'col-lg-6',
              key: 'email',
              type: 'input',
              templateOptions: {
                label: 'Email',
                required: true,
                maxLength: 1000,
                disabled: true
              },
              validators: {
                validation: ['email']
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-12',
              key: 'description',
              type: 'textarea',
              templateOptions: {
                label: 'Description',
                maxLength: 1000
              }
            }
          ]
        }
      ]
    },
    {
      template:
        '<h6 class="heading-small text-muted mb-4">CURRENCY INFORMATION</h6>'
    },
    {
      fieldGroupClassName: 'pl-lg-4 d-block',
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-6',
              key: 'bitcoinWalletId',
              type: 'uuid',
              templateOptions: {
                label: 'Bitcoin Wallet Id'
              }
            },
            {
              className: 'col-lg-6',
              key: 'bitcoinWalletBalance',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Bitcoin Wallet Balance',
                max: 1000000000
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-6',
              key: 'ethereumWalletId',
              type: 'uuid',
              templateOptions: {
                label: 'Ethereum Wallet Id'
              }
            },
            {
              className: 'col-lg-6',
              key: 'ethereumWalletBalance',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Ethereum Wallet Balance',
                max: 1000000000
              }
            }
          ]
        },
      ]
    },
    {
      template:
        '<h6 class="heading-small text-muted mb-4">SETTINGS</h6>'
    },
    {
      fieldGroupClassName: 'pl-lg-4 d-block',
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-lg-6',
              key: 'maxTransactionLimit',
              type: 'input',
              templateOptions: {
                label: 'Max Transaction Limit',
              }
            }
          ]
        }
      ]
    }
  ];

  constructor(private userDispatchers: UserDispatchers) {
    super();
  }

  submit() {
    this.userDispatchers.updateUser(this.user);
  }
}
