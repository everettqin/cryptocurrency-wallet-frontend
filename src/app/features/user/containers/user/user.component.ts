import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

// App
import { User, AppBaseComponent } from '@app/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserDispatchers, UserSelectors } from '@app/store';

// Lib
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent extends AppBaseComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userDispatchers: UserDispatchers,
    private userSelector: UserSelectors,
  ) {
    super();

    this.user$ = this.userSelector.user$;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userDispatchers.getUser(params.identifier);
    });
  }
}
