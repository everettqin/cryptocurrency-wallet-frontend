import { UserEffects } from './user.effects';
import { TransactionEffects } from './transaction.effects';

export const effects: any[] = [UserEffects, TransactionEffects];

export * from './user.effects';
export * from './transaction.effects';
