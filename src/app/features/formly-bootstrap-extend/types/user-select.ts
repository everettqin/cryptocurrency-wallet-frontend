import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, Subject, concat, of } from 'rxjs';
import { UserDataService } from '@app/resources/user-data.service';
import {
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { User } from '@app/core';

@Component({
  selector: 'formly-field-ng-select',
  template: `
    <ng-select
      [items]="users$ | async"
      bindLabel="name"
      bindValue="identifier"
      [multiple]="false"
      [hideSelected]="true"
      [trackByFn]="trackByFn"
      [minTermLength]="2"
      [loading]="usersLoading"
      typeToSearchText="Please enter 2 or more characters"
      [typeahead]="usersInput$"
      [(ngModel)]="selectedItemId"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    >
    </ng-select>
  `
})
export class FormlyFieldUserSelect extends FieldType implements OnInit {
  users$: Observable<User[]>;
  usersLoading = false;
  usersInput$ = new Subject<string>();
  selectedItemId: string;

  constructor(private userDataService: UserDataService) {
    super();
  }
  ngOnInit() {
    this.loadUsers();
  }

  trackByFn(item: any) {
    return item.id;
  }

  private loadUsers() {
    this.users$ = concat(
      of([]), // default items
      this.usersInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.usersLoading = true)),
        switchMap(query =>
          this.userDataService.getUsers(1, query).pipe(
            catchError(() => of([])), // empty list on error
            map(res => res['data']),
            tap(() => (this.usersLoading = false))
          )
        )
      )
    );
  }
}
