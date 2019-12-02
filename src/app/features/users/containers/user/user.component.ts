import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { User, AppBaseComponent } from '@app/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserDispatchers, UserSelectors } from '@app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent extends AppBaseComponent implements OnInit {
  user$: Observable<User>;
  //   @Input() user: User;
  //   @Input() commands: MasterDetailCommands<User>;

  //   @ViewChild('name', { static: true }) nameElement: ElementRef;

  //   addMode = false;
  //   form = this.fb.group({
  //     id: [],
  //     name: ['', Validators.required],
  //     saying: ['']
  //   });

  constructor(
    private route: ActivatedRoute,
    private userDispatchers: UserDispatchers,
    private userSelector: UserSelectors
  ) {
    super();

    this.user$ = this.userSelector.user$;
  }

  //   close() {
  //     this.commands.close();
  //   }

  //   saveUser() {
  //     const { dirty, valid, value } = this.form;
  //     if (dirty && valid) {
  //       const newUser = { ...this.user, ...value };
  //       this.addMode ? this.commands.add(newUser) : this.commands.update(newUser);
  //     }
  //     this.close();
  //   }

  //   setFocus() {
  //     this.nameElement.nativeElement.focus();
  //   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userDispatchers.getUser(params.identifier);
    });
  }
}
