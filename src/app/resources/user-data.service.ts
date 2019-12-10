import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { User, Response } from '@app/core/models/';
import { DataServiceError } from '@app/core/errors/data-service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  apiUrl = `${environment.api}/users/`;

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, user)
      .pipe(catchError(this.handleError(user)));
  }

  getUsers(page: number, query: string = ''): Observable<Response> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('query', query);
    return this.http
      .get<Response>(this.apiUrl, { params })
      .pipe(catchError(this.handleError()));
  }

  getUser(identifier: string): Observable<Response> {
    return this.http
      .get<Response>(`${this.apiUrl}${identifier}`)
      .pipe(catchError(this.handleError()));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${user.identifier}`, user).pipe(
      map(() => user), // return the updated user
      catchError(this.handleError(user))
    );
  }

  validateEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);

    return this.http
      .get<any>(`${this.apiUrl}/validate_email`, { params })
      .pipe(
        map(res => res.data),
        catchError(this.handleError())
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
