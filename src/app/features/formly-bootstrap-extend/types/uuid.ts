import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-uuid',
  template: `
    <input
      type="text"
      mask="AAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
      [formControl]="formControl"
      class="form-control"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    />
  `
})
export class FormlyFieldUUID extends FieldType {}
