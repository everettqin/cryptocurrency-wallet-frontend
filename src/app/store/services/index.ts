import { UserDispatchers } from './user.dispatchers';
import { UserSelectors } from './user.selectors';

import { TransactionDispatchers } from './transaction.dispatchers';
import { TransactionSelectors } from './transaction.selectors';

export const STORE_SERVICES = [
  UserDispatchers,
  UserSelectors,
  TransactionDispatchers,
  TransactionSelectors
];

export * from './user.dispatchers';
export * from './user.selectors';

export * from './transaction.dispatchers';
export * from './transaction.selectors';
