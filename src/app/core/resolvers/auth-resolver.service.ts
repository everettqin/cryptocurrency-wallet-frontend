import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularTokenService } from 'angular-token';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) {}

  resolve(): Observable<any> {
    return this.tokenService
      .validateToken()
      .pipe(
        catchError(err =>
          of(this.router.navigate(['outside', 'auth', 'sign-in']))
        )
      );
  }
}
