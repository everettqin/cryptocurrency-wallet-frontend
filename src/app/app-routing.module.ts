import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { InsideComponent } from './core';
import { UsersComponent, UserComponent } from './features/user/containers';
import {
  TransactionsComponent,
  TransactionComponent
} from './features/transaction/containers';

const routes: Routes = [
  {
    path: 'inside',
    component: InsideComponent,
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
  // {
  //   path: 'auth',
  //   loadChildren: './features/auth#AuthModule'
  // },
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
