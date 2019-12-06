import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import * as TransactionActions from '../actions';
import { TransactionDataService } from '@app/resources';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TransactionEffects {
  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.getTransactions),
      switchMap(action =>
        this.transactionDataService.getTransactions(action.page).pipe(
          map(res =>
            TransactionActions.getTransactionsSuccess({
              transactions: res.data,
              meta: res.meta
            })
          ),
          catchError(error =>
            of(TransactionActions.getTransactionsError({ error }))
          )
        )
      )
    )
  );

  getTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.getTransaction),
      switchMap(action =>
        this.transactionDataService.getTransaction(action.identifier).pipe(
          map(res =>
            TransactionActions.getTransactionSuccess({ transaction: res.data })
          ),
          catchError(error =>
            of(TransactionActions.getTransactionError({ error }))
          )
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.addTransaction),
      concatMap(action =>
        this.transactionDataService.addTransaction(action.transaction).pipe(
          map(transaction =>
            TransactionActions.addTransactionSuccess({ transaction })
          ),
          catchError(error =>
            of(TransactionActions.addTransactionError({ error }))
          )
        )
      )
    )
  );

  addTransactionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.addTransactionSuccess),
        tap(() => this.toastrService.success('Transaction created successful')),
        tap(() => this.ngbModel.dismissAll()),
        tap(action =>
          this.router.navigate(['/inside/transactions', action.transaction.id])
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private transactionDataService: TransactionDataService,
    private router: Router,
    private ngbModel: NgbModal,
    private toastrService: ToastrService
  ) {}
}
