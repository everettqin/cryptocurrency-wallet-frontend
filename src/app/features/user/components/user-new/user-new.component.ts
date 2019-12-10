import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// app
import { AppBaseComponent } from '@app/core';
import { UserDispatchers } from '@app/store';
import { UserDataService } from '@app/resources';
import { environment } from '@env/environment';

// ui
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
      modelOptions: {
        updateOn: 'blur'
      },
      validators: {
        validation: ['email']
      },
      asyncValidators: {
        uniqueEmail: {
          expression: (control: FormControl) => {
            const params = new HttpParams().set('email', control.value);
            return this.http
              .get(`${environment.api}/users/validate_email`, { params })
              .toPromise()
              .then(res => res['validated']);
          },
          message: 'This email is already taken.'
        }
      }
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
    private userDataService: UserDataService,
    private http: HttpClient
  ) {
    super();
  }

  submit() {
    this.userDispatchers.addUser(this.newUser);
  }
}
