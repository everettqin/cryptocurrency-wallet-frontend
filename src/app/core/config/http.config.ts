// Angular core modules
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App modules
import { InflectorInterceptor } from '../interceptors/inflector.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';


@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InflectorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class HttpConfigModule {}
