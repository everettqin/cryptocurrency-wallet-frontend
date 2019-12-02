import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InsideComponent} from './core';

const routes: Routes = [
  {
    path: 'inside',
    component: InsideComponent,
    children: [
      {
        path: 'users',
        loadChildren: './features/users/users.module#UsersModule'
      },
      {
        path: 'transactions',
        loadChildren: './features/transactions/transactions.module#TransactionsModule'
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
