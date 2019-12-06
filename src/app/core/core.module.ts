import { NgModule, Optional, SkipSelf } from '@angular/core';

// app
import { SharedModule } from '../features/shared/shared.module';
import { throwIfAlreadyLoaded } from './utils/angular';

// configs
import { HttpConfigModule } from './config/http.config';
import { FormConfigModule } from './config/form.config';
import { UIConfigModule } from './config/ui.config';
import { AuthConfigModule } from './config/auth.config';

// components
import { CORE_CONTAINERS } from './containers';
import { CORE_COMPONENTS } from './components';


@NgModule({
  declarations: [...CORE_CONTAINERS, ...CORE_COMPONENTS],
  imports: [
    HttpConfigModule,
    FormConfigModule,
    UIConfigModule,
    AuthConfigModule,
    SharedModule
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
