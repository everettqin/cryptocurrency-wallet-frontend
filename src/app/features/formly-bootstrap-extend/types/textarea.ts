import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-textarea',
  template: `
    <textarea
      autosize
      [formControl]="formControl"
      [cols]="to.cols"
      [minRows]="to.rows"
      class="form-control"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `
})
export class FormlyFieldTextArea extends FieldType {
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 3
    }
  };
}
