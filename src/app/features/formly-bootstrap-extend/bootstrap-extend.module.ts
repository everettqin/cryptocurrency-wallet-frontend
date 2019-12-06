import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import {
  BOOTSTRAP_FORMLY_CONFIG,
  FIELD_TYPE_COMPONENTS
} from './bootstrap-extend.config';
import { FormlyBootstrapAddonsModule } from '@ngx-formly/bootstrap/addons';
import { AutosizeModule } from 'ngx-autosize';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [FIELD_TYPE_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild(BOOTSTRAP_FORMLY_CONFIG),
    FormlyBootstrapAddonsModule,
    AutosizeModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class FormlyBootstrapExtendModule {}
