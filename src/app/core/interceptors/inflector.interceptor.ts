import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpParams
} from '@angular/common/http';
import { map } from 'rxjs/operators';

// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// change case libs
import * as changeCase from 'change-case';
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');

@Injectable()
export class InflectorInterceptor implements HttpInterceptor {
  regexpJsonFile: RegExp = /.json/;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body && typeof req.body === 'object') {
      console.log('ob', req.body, typeof req.body);
      console.log(snakeCaseKeys({ amount: 0, sourceUserId: '123' }));
      req = req.clone({
          body: snakeCaseKeys(req.body)
        });
    }

    if (req.params) {
      let newParams = req.params;
      newParams.keys().forEach(key => {
        newParams = newParams
          .delete(key)
          .append(changeCase.snakeCase(key), newParams.get(key));
      });
      req = req.clone({
        params: newParams
      });
    }

    return next.handle(req).pipe(
      map(
        event => {
          if (event instanceof HttpResponse) {
            // Filter language json files
            if (!this.regexpJsonFile.test(event.url)) {
              event = event.clone({
                body: camelCaseKeys(event.body, { deep: true })
              });
            }
            return event;
          }
        },
        error => {
          // http response status code
          console.log('----response----');
          console.error('status code:');
          console.error(error.status);
          console.error(error.message);
          console.log('--- end of response---');
        }
      )
    );
  }
}
