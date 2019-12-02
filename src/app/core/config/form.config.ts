// Angular core modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapExtendModule } from '@app/features/formly-bootstrap-extend';

// import { FormlyBootstrapExtendModule } from '../../features/formly-bootstrap-extend';

// import { FormlyBootstrapAddonsModule } from '@clemos/web/features/formly-bootstrap-extend/addons';

@NgModule({
  imports: [
    // FormsModule,
    // NgxAutosizeModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapExtendModule
    // FormlyBootstrapAddonsModule,
    // FormlyBootstrapExtendModule
  ]
})
export class FormConfigModule {}
