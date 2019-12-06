import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { InsideComponent, OutsideComponent, AuthResolver } from './core';
import { UsersComponent, UserComponent } from './features/user/containers';
import {
  TransactionsComponent,
  TransactionComponent
} from './features/transaction/containers';

// Libs
import { AngularTokenService } from 'angular-token';
import { SignInComponent } from './features/auth/containers/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'inside',
    component: InsideComponent,
    canActivate: [AngularTokenService],
    resolve: {
      currentUser: AuthResolver
    },
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent
          },
          {
            path: ':identifier',
            component: UserComponent
          }
        ]
      },
      {
        path: 'transactions',
        children: [
          {
            path: '',
            component: TransactionsComponent
          },
          {
            path: ':identifier',
            component: TransactionComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'outside',
    component: OutsideComponent,
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            component: SignInComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/inside/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
