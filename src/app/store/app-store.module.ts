import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { STORE_SERVICES } from './services';
import { effects } from './effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...STORE_SERVICES],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
