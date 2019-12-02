import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { User, Response, DataServiceError } from '@app/core';
import { environment } from '@env/environment';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.api}/users/`, user)
      .pipe(catchError(this.handleError(user)));
  }

  getUsers(page: number): Observable<Response> {
    const params = new HttpParams().set('page', page.toString());
    return this.http
      .get<Response>(`${environment.api}/users`, { params })
      .pipe(catchError(this.handleError()));
  }

  getUser(identifier: string): Observable<Response> {
    return this.http
      .get<Response>(`${environment.api}/users/${identifier}`)
      .pipe(catchError(this.handleError()));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${environment.api}/users/${user.identifier}`, user)
      .pipe(
        map(() => user), // return the updated user
        catchError(this.handleError(user))
      );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      // return new ErrorObservable(error);
      return throwError(error);
    };
  }
}
