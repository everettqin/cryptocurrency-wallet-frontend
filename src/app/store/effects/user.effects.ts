import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import * as UserActions from '../actions';
import { UserDataService, TransactionDataService } from '@app/resources';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(action =>
        this.userDataService.getUsers(action.page).pipe(
          map(res =>
            UserActions.getUsersSuccess({ users: res.data, meta: res.meta })
          ),
          catchError(error => of(UserActions.getUsersError({ error })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      switchMap(action =>
        this.userDataService.getUser(action.identifier).pipe(
          map(res => UserActions.getUserSuccess({ user: res.data })),
          catchError(error => of(UserActions.getUserError({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      concatMap(action =>
        this.userDataService.addUser(action.user).pipe(
          map(user => UserActions.addUserSuccess({ user })),
          catchError(error => of(UserActions.addUserError({ error })))
        )
      )
    )
  );

  addUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.addUserSuccess),
        tap(() => this.toastrService.success('User created successful')),
        tap(() => this.ngbModel.dismissAll()),
        tap(action => this.router.navigate(['/inside/users', action.user.id]))
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap(action =>
        this.userDataService.updateUser(action.user).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          catchError(error => of(UserActions.updateUserError({ error })))
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => this.toastrService.success('User updated successful'))
      ),
    { dispatch: false }
  );

  getUserTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserTransactions),
      switchMap(action =>
        this.transactionDataService.getTransactions(action.page, action.userIdentifier).pipe(
          map(res =>
            UserActions.getUserTransactionsSuccess({
              transactions: res.data,
              meta: res.meta
            })
          ),
          catchError(error =>
            of(UserActions.getUserTransactionsError({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private transactionDataService: TransactionDataService,
    private router: Router,
    private ngbModel: NgbModal,
    private toastrService: ToastrService
  ) {}
}
