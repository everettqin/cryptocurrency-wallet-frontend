import {
  Component
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// app
import { User, AppBaseComponent } from '@app/core';

// ui
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserDispatchers } from '@app/store';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html'
})
export class UserNewComponent extends AppBaseComponent {

  form = new FormGroup({});
  newUser: any = {
    name: '',
    email: '',
    description: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        required: true,
        maxLength: 512
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true,
        maxLength: 1000
      },
      validators: {
        validation: ['email'],
      },
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        maxLength: 1000
      }
    }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private userDispatchers: UserDispatchers,
    private toastrService: ToastrService) {
    super();
  }

  submit() {
    this.userDispatchers.addUser(this.newUser);
  }
}
