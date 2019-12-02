import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { USERS_CONTAINERS, UsersComponent, UserComponent } from './containers';
import { USERS_COMPONENTS, USERS_ENTRY_COMPONENTS } from './components';

import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':identifier',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [...USERS_CONTAINERS, ...USERS_COMPONENTS],
  exports: [...USERS_CONTAINERS, ...USERS_COMPONENTS],
  entryComponents: [...USERS_ENTRY_COMPONENTS]
})
export class UsersModule {}
