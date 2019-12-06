import { NgModule } from '@angular/core';

// App
import {
  TRANSACTION_CONTAINERS,
} from './containers';

import {
  TRANSACTION_COMPONENTS,
  TRANSACTION_ENTRY_COMPONENTS
} from './components';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [SharedModule],
  declarations: [...TRANSACTION_CONTAINERS, ...TRANSACTION_COMPONENTS],
  exports: [...TRANSACTION_CONTAINERS, ...TRANSACTION_COMPONENTS],
  entryComponents: [...TRANSACTION_ENTRY_COMPONENTS]
})
export class TransactionModule {}
