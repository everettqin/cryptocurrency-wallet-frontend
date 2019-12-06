import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Transaction, Response, DataServiceError } from '@app/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {
  constructor(private http: HttpClient) {}

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${environment.api}/transactions/`, transaction)
      .pipe(catchError(this.handleError(transaction)));
  }

  getTransactions(page: number, userIdentifier: string = ''): Observable<Response> {
    let params = new HttpParams().set('page', page.toString())

    if (userIdentifier.length > 0) {
      params = params.append('userId', userIdentifier);
    }

    return this.http
      .get<Response>(`${environment.api}/transactions`, { params })
      .pipe(catchError(this.handleError()));
  }

  getTransaction(identifier: string): Observable<Response> {
    return this.http
      .get<Response>(`${environment.api}/transactions/${identifier}`)
      .pipe(catchError(this.handleError()));
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
