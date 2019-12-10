// Angular core modules
import { NgModule } from '@angular/core';

// App
import { environment } from '@env/environment';
// Libs
import { AngularTokenModule } from 'angular-token';

@NgModule({
  imports: [
    AngularTokenModule.forRoot({
      apiBase: environment.api,
      apiPath: 'auth',
      signInPath: 'sign_in',
      signInRedirect: 'outside/auth/sign-in',
      signOutPath: 'sign_out',
      validateTokenPath: 'validate_token',
      signOutFailedValidate: true
    })
  ],
  exports: [AngularTokenModule],
  providers: [AngularTokenModule]
})
export class AuthConfigModule {}
