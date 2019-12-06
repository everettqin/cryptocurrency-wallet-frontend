// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// libs
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapExtendModule } from '@app/features/formly-bootstrap-extend';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapExtendModule
  ]
})
export class FormConfigModule {}
