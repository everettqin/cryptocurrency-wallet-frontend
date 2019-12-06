import { NgModule } from '@angular/core';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';

const components = [SignInComponent];

@NgModule({
  imports: [SharedModule],
  declarations: components
})
export class AuthModule {}
 