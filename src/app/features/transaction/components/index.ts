import { TransactionNewComponent } from './transaction-new/transaction-new.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionHistoryComponent } from './transaction-history.component.html/transaction-history.component';

export const TRANSACTION_COMPONENTS = [
    TransactionNewComponent,
    TransactionDetailComponent,
    TransactionHistoryComponent
];

export const TRANSACTION_ENTRY_COMPONENTS = [
    TransactionNewComponent
];

export * from './transaction-new/transaction-new.component';
export * from './transaction-detail/transaction-detail.component';
export * from './transaction-history.component.html/transaction-history.component';
