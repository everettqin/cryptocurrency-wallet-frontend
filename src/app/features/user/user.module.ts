import { NgModule } from '@angular/core';

// App
import { USER_CONTAINERS } from './containers';
import { USER_COMPONENTS, USER_ENTRY_COMPONENTS } from './components';

import { TransactionModule } from '../transaction/transaction.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [TransactionModule, SharedModule],
  declarations: [...USER_CONTAINERS, ...USER_COMPONENTS],
  exports: [...USER_CONTAINERS, ...USER_COMPONENTS],
  entryComponents: [...USER_ENTRY_COMPONENTS]
})
export class UserModule {}
