import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AppBaseComponent, User, Meta } from '@app/core';
import {
  UserDispatchers,
  UserSelectors
} from '@app/store/services';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserNewComponent } from '../../components/user-new/user-new.component';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent extends AppBaseComponent implements OnInit {
  page: number;
  pageSize: number;
  collectionSize: number;

  users$: Observable<User[]>;
  meta$: Observable<Meta>;
  loading$: Observable<boolean>;

  constructor(
    private userDispatchers: UserDispatchers,
    private userSelectors: UserSelectors,
    private modalService: NgbModal
  ) {
    super();

    this.users$ = this.userSelectors.users$;
    this.loading$ = this.userSelectors.loading$;
    this.meta$ = this.userSelectors.meta$;
  }

  getUsers(page: number = 1) {
    this.userDispatchers.getUsers(page);
  }

  newUser() {
    this.modalService.open(UserNewComponent);
  }

  ngOnInit() {
    this.getUsers();
  }
}
