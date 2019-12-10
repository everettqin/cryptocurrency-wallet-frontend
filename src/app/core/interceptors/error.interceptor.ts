import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }

  /* tslint:disable */
  public handleError = (errorRes: HttpErrorResponse) => {
    const {
      error: { status, errors, message }
    } = errorRes;

    if (errors) {
      for (let key in errors) {
        this.toastrService.error(errors[key]);
      }
    }

    return throwError(errorRes);
  };
}
